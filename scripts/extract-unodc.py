"""Extracts tables from UNODC's World Drug Report annex into CSVs the site can read.

  python3 scripts/extract-unodc.py offences
  python3 scripts/extract-unodc.py use
  python3 scripts/extract-unodc.py youth
  python3 scripts/extract-unodc.py seizures

The spreadsheets are kept in /datasets as downloaded from
https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2026-annex.html

offences  table 10.1, sheet "Formal contact": persons brought into contact with the police for
          "Offences related to drug use and/or drug possession", any illicit drug, every year
          with a figure for each country. Writes datasets/unodc-drug-possession-police.csv.

use       table 1.2, sheet "Cannabis": past-year cannabis use, every survey for each country
          (one per year). Rewrites datasets/unodc-cannabis-use.csv: the earlier surveys, then
          one headline row for every country file, the latest, which alone carries users:
            source  "wdr2026" from the table; "earlier" a figure from before this table was
                    used (Wikipedia's list of older UNODC figures), kept where the table has
                    none; "estimate" the median of the measured countries in the same region
            users   the share applied to a population of the same age band, from the World
                    Bank's five-year age groups (fetched when the script runs), to two
                    significant figures. A band that cuts through a group is split evenly
                    and marked users_approximate. A survey with no recorded age, and a
                    regional median, use ages 15 to 64. Where that population is missing,
                    the row has no user count.
          Places the World Bank does not list keep the 15-to-64 population the file already had.

youth     table 1.4, sheet "Cannabis": cannabis use among 15- and 16-year-olds, every survey
          with a past-year figure for each country (the first listed, where a year has two). Rows about one kind of cannabis
          (herb or resin only) or one part of a country are left out; the age group is
          written out ("(SS) 15 - 16" becomes "ages 15–16, school survey"). Writes
          datasets/unodc-cannabis-use-youth.csv.

seizures  table 7.1, sheet "Seizures": kilograms of cannabis herb and of cannabis resin seized,
          every year reported (2015 to 2024). Plants, oil and seeds are left out: they are
          counted in different ways and cannot be added to weights. `reported_by` is UNODC's
          source for the figures (ARQ, ARQMSC: the government's annual report questionnaire; GOV:
          another government source; AU: the African Union; INCSR: the US State Department).
          Writes datasets/unodc-cannabis-seizures.csv, one row per country and year.

Python's standard library only. A country name that matches no country file is listed, so that
an alias can be added below. Run from the project root.
"""
import csv, glob, json, re, statistics, sys, unicodedata, urllib.request, zipfile
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}

# UNODC's names for countries our files name otherwise
ALIASES = {
    "United States of America": "us", "United Kingdom": "gb", "Russian Federation": "ru", "Turkey": "tr",
    "Netherlands (Kingdom of the)": "nl", "Türkiye": "tr", "Republic of Korea": "kr",
    "Republic of Moldova": "md", "Iran (Islamic Republic of)": "ir", "Bolivia (Plurinational State of)": "bo",
    "Venezuela (Bolivarian Republic of)": "ve", "Viet Nam": "vn", "Czechia": "cz", "Syrian Arab Republic": "sy",
    "Lao People's Democratic Republic": "la", "United Republic of Tanzania": "tz", "Brunei Darussalam": "bn",
    "China, Hong Kong SAR": "hk", "China, Macao SAR": "mo", "Democratic Republic of the Congo": "cd",
    "Congo": "cg", "Côte d'Ivoire": "ci", "State of Palestine": "ps", "Kosovo under UNSCR 1244": "xk",
    "Micronesia (Federated States of)": "fm", "Saint Vincent and the Grenadines": "vc", "Cabo Verde": "cv",
    "North Macedonia": "mk", "Sao Tome and Principe": "st", "Taiwan Province of China": "tw",
    "China, Taiwan Province of China": "tw", "Democratic People's Republic of Korea": "kp", "Myanmar": "mm",
    "Eswatini": "sz", "Timor-Leste": "tl",
    # the United Kingdom reports its nations separately: England and Wales stands for it
    "United Kingdom (England and Wales)": "gb",
}
SKIP = {"United Kingdom (Scotland)", "United Kingdom (Northern Ireland)", "Holy See"}


def col(ref):
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


def read_sheet(path, name):
    z = zipfile.ZipFile(path)
    strings = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
            strings.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
    book = ET.fromstring(z.read("xl/workbook.xml"))
    rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
    sheet = next(s for s in book.find("m:sheets", NS) if s.get("name") == name)
    target = rels[sheet.get("{%s}id" % NS["r"])].lstrip("/")
    target = target if target.startswith("xl/") else "xl/" + target
    rows = []
    for row in ET.fromstring(z.read(target)).iter("{%s}row" % NS["m"]):
        cells = {}
        for c in row.findall("m:c", NS):
            v = c.find("m:v", NS)
            cells[col(c.get("r"))] = strings[int(v.text)] if c.get("t") == "s" and v is not None else (v.text if v is not None else "")
        rows.append([cells.get(i, "") for i in range(max(cells) + 1)] if cells else [])
    return rows


def norm(s):
    return re.sub(r"[^a-z]", "", unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower())


def country_files():
    """id → (name, region) for every country file"""
    out = {}
    for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml"):
        cid = path.split("/")[1].replace(".yaml", "")
        text = open(path, encoding="utf-8").read()
        name = re.search(r"^name: (.+)$", text, re.M).group(1).strip().strip("\"'")
        region = re.search(r"^region: (.+)$", text, re.M).group(1).strip()
        out[cid] = (name, region)
    return out


def matcher(files, missed):
    by_name = {norm(name): cid for cid, (name, _) in files.items()}
    def match(name):
        name = name.strip()
        if name in SKIP or " " in name and name.split()[0] in ("Would", "Note", "Notes"):  # a remark in the name column
            return None
        cid = ALIASES.get(name) or by_name.get(norm(name))
        if not cid:
            missed.add(name)
        return cid
    return match


def write(path, head, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(head)
        w.writerows(rows)


def offences():
    rows = read_sheet("datasets/unodc-wdr2026-10.1-drug-related-crimes.xlsx", "Formal contact")
    head = rows[1]
    at = {h: i for i, h in enumerate(head)}
    missed = set()
    match = matcher(country_files(), missed)
    latest = {}
    for r in rows[2:]:
        r = r + [""] * (len(head) - len(r))
        if not r[at["Type of offence"]].startswith("Offences related to drug use") or r[at["Drug"]] != "Any Illicit drugs":
            continue
        total = r[at["Calculated total"]]
        year, note = r[at["Year"]], r[at["Specify year if other"]]
        if total == "":
            continue
        # a year given in words: the United Kingdom reports the year ending March 2025
        if not year.isdigit():
            found = re.findall(r"20\d\d", note)
            if r[at["Country"]] != "United Kingdom" or not found:
                continue
            year = found[-1]
        cid = match(r[at["Country"]])
        if cid:
            latest[(cid, int(year))] = [cid, r[at["Country"]], int(year), int(float(total)), note]
    write("datasets/unodc-drug-possession-police.csv", ["country", "unodc_name", "year", "persons", "year_note"], sorted(latest.values()))
    print(f"{len(latest)} rows for {len({k[0] for k in latest})} countries written")
    return missed


def two_figures(n):
    """3,712,345 → 3,700,000; 8,712 → 8,700"""
    if n <= 0:
        return 0
    digits = len(str(int(n))) - 2
    return int(round(n, -digits)) if digits > 0 else int(round(n))


def world_bank_latest(code):
    """iso2 → (year, people), the indicator's most recent value for each country"""
    url = f"https://api.worldbank.org/v2/country/all/indicator/{code}?format=json&mrnev=1&per_page=20000"
    with urllib.request.urlopen(url, timeout=120) as res:
        rows = json.load(res)[1] or []
    latest = {}
    for r in rows:
        if r["value"] is None:
            continue
        latest[r["country"]["id"].lower()] = (int(r["date"]), int(round(r["value"])))
    return latest


def world_bank_15_64():
    return world_bank_latest("SP.POP.1564.TO")


# Five-year groups, then 80+. The last group is open-ended; a survey that stops inside it
# is split across ages 80–99.
AGE_GROUPS = [
    (0, 4, "SP.POP.0004"), (5, 9, "SP.POP.0509"), (10, 14, "SP.POP.1014"),
    (15, 19, "SP.POP.1519"), (20, 24, "SP.POP.2024"), (25, 29, "SP.POP.2529"),
    (30, 34, "SP.POP.3034"), (35, 39, "SP.POP.3539"), (40, 44, "SP.POP.4044"),
    (45, 49, "SP.POP.4549"), (50, 54, "SP.POP.5054"), (55, 59, "SP.POP.5559"),
    (60, 64, "SP.POP.6064"), (65, 69, "SP.POP.6569"), (70, 74, "SP.POP.7074"),
    (75, 79, "SP.POP.7579"), (80, None, "SP.POP.80UP"),
]
OPEN_SPAN = 20


def world_bank_age_groups():
    """iso2 → (year, [people in each AGE_GROUPS band]). A country missing any group is left out."""
    codes = [stem + sex for _, _, stem in AGE_GROUPS for sex in (".MA", ".FE")]
    with ThreadPoolExecutor(max_workers=8) as pool:
        fetched = dict(zip(codes, pool.map(world_bank_latest, codes)))
    out = {}
    ids = set()
    for series in fetched.values():
        ids.update(series)
    for cid in ids:
        counts, years, missing = [], [], False
        for _, _, stem in AGE_GROUPS:
            male, female = fetched[stem + ".MA"].get(cid), fetched[stem + ".FE"].get(cid)
            if not male or not female:
                missing = True
                break
            counts.append(male[1] + female[1])
            years.extend((male[0], female[0]))
        if not missing:
            out[cid] = (min(years), counts)
    return out


def parse_ages(text):
    """'15-64' → (15, 64); '15+' → (15, None). None when the text is not an age band."""
    text = (text or "").strip()
    plus = re.fullmatch(r"(\d+)\s*\+", text)
    if plus:
        return int(plus.group(1)), None
    span = re.fullmatch(r"(\d+)\s*-\s*(\d+)", text)
    if span:
        lo, hi = int(span.group(1)), int(span.group(2))
        if lo <= hi:
            return lo, hi
    return None


def band_population(counts, lo, hi):
    """People from age lo through hi (hi None means no upper limit). The second value is true
    when a five-year group, or the open 80+ group, had to be split."""
    total, approximate = 0.0, False
    for (g0, g1, _), n in zip(AGE_GROUPS, counts):
        if hi is not None and g0 > hi:
            break
        if g1 is not None and g1 < lo:
            continue
        if g1 is None:
            if hi is None or hi >= 80 + OPEN_SPAN - 1:
                total += n
            elif hi >= 80:
                total += n * (hi - 80 + 1) / OPEN_SPAN
                approximate = True
            continue
        start, end = max(lo, g0), g1 if hi is None else min(hi, g1)
        if start > end:
            continue
        span, cover = g1 - g0 + 1, end - start + 1
        if cover == span:
            total += n
        else:
            total += n * cover / span
            approximate = True
    return int(round(total)), approximate


def use():
    rows = read_sheet("datasets/unodc-wdr2026-1.2-prevalence-national.xlsx", "Cannabis")
    head = rows[2]
    at = {h: i for i, h in enumerate(head)}
    files = country_files()
    missed = set()
    match = matcher(files, missed)
    # every survey per country, one per year (a period such as "2022/23" counts as its last year;
    # where a year has several, the one for ages 15 to 64 is kept); the latest is the headline
    history = {}
    for r in rows[3:]:
        r = r + [""] * (len(head) - len(r))
        name, best, period = r[at["Country/Territory"]], r[at["Best"]], str(r[at["Year"]]).strip()
        if not name.strip() or best == "" or not re.search(r"\d{4}", period):
            continue
        end = re.findall(r"\d{2,4}", period)[-1]
        year = int(end) if len(end) == 4 else int(period[:2] + end)
        cid = match(name)
        if not cid:
            continue
        survey = {"prevalence": round(float(best), 2), "year": year, "period": period, "ages": r[at["Age"]].strip(), "unodc_name": name.strip()}
        known = history.setdefault(cid, {}).get(year)
        if not known or (survey["ages"] == "15-64" and known["ages"] != "15-64"):
            history[cid][year] = survey
    surveys = {cid: by_year[max(by_year)] for cid, by_year in history.items()}
    # what the file had before: earlier figures, and a population for places the World Bank lacks
    # (the file has a row per survey: the latest one carries the users and population)
    before = {}
    for r in csv.DictReader(open("datasets/unodc-cannabis-use.csv", encoding="utf-8")):
        if r["users"] or r["country"] not in before:
            before[r["country"]] = r
    print("fetching World Bank populations…", file=sys.stderr)
    wb = world_bank_15_64()
    groups = world_bank_age_groups()
    out = {}
    for cid in files:
        old = before.get(cid, {})
        if cid in surveys:
            row = {**surveys[cid], "source": "wdr2026"}
        elif old and old.get("estimate") != "true" and old.get("source", "earlier") == "earlier":
            row = {"prevalence": float(old["prevalence"]), "year": int(old["year"]), "period": old.get("period") or old["year"],
                   "ages": old.get("ages", ""), "unodc_name": "", "source": "earlier"}
        else:
            row = {"source": "estimate", "ages": ""}
        if cid in wb:
            row["population_year"], row["population_15_64"] = wb[cid]
        elif old.get("population_15_64"):
            row["population_year"], row["population_15_64"] = old.get("population_year", ""), int(old["population_15_64"])
        elif old.get("users") and old.get("prevalence") and float(old["prevalence"]) > 0:
            # only a fallback for the 15–64 reference: the previous file applied every rate to that band
            row["population_year"], row["population_15_64"] = "", int(round(int(old["users"]) / (float(old["prevalence"]) / 100)))
        else:
            row["population_year"], row["population_15_64"] = "", 0
        out[cid] = row
    # no survey at all: the median of the measured countries in the same region.
    # That median is computed here. It is not a regional total published by UNODC.
    for cid, row in out.items():
        if row["source"] == "estimate":
            region = files[cid][1]
            row["prevalence"] = round(statistics.median(r["prevalence"] for k, r in out.items() if r["source"] != "estimate" and files[k][1] == region), 2)
    lines, omitted = [], []
    for cid in sorted(out):
        r = out[cid]
        # the earlier surveys, oldest first, without users: today's population says nothing of them
        for year in sorted(history.get(cid, {})):
            e = history[cid][year]
            if r["source"] == "wdr2026" and year < r["year"]:
                lines.append([cid, files[cid][0], e["unodc_name"], e["prevalence"], year, e["period"], e["ages"], "", "wdr2026", "", "", "", "", "", ""])
        if not r["population_year"] and cid in groups:
            r["population_year"] = groups[cid][0]
        band, band_ages, approximate = headcount(cid, r, groups)
        users = two_figures(band * r["prevalence"] / 100) if band else ""
        if not band:
            omitted.append(f"{cid} ({r.get('ages') or r['source']})")
        lines.append([cid, files[cid][0], r.get("unodc_name", ""), r["prevalence"], r.get("year", ""), r.get("period", ""), r.get("ages", ""),
                      "true" if r["source"] == "estimate" else "", r["source"], r["population_15_64"] or "", r["population_year"],
                      band or "", band_ages, "true" if approximate else "", users])
    write("datasets/unodc-cannabis-use.csv",
          ["country", "name", "unodc_name", "prevalence", "year", "period", "ages", "estimate", "source",
           "population_15_64", "population_year", "population_band", "population_ages", "users_approximate", "users"], lines)
    counts = {s: sum(1 for r in out.values() if r["source"] == s) for s in ("wdr2026", "earlier", "estimate")}
    print(f"{len(out)} countries, {len(lines)} rows written: {counts}")
    if omitted:
        print(f"no matching population, user count left blank: {'; '.join(omitted)}", file=sys.stderr)
    return missed


def headcount(cid, row, groups):
    """Population the prevalence is applied to: (people, age label, approximate).

    A survey is applied to its own age band. An imputed regional median, and an earlier
    figure whose survey age was not recorded, use ages 15–64. The count is approximate
    when a five-year group is split, or when 15–64 stands in for an unrecorded survey age.
    Returns (0, "", False) when no matching population is available, so no user count is written.
    """
    pop = row.get("population_15_64") or 0
    ages = parse_ages(row.get("ages"))
    if row["source"] == "estimate" or not ages:
        if not pop and cid in groups:
            pop, _ = band_population(groups[cid][1], 15, 64)
        # the median has no survey age; an earlier figure with no age is only assumed to be 15–64
        return (pop, "15-64", row["source"] != "estimate") if pop else (0, "", False)
    lo, hi = ages
    if (lo, hi) == (15, 64) and pop:
        return pop, "15-64", False
    if cid not in groups:
        return (0, "", False)
    band, approximate = band_population(groups[cid][1], lo, hi)
    label = f"{lo}+" if hi is None else f"{lo}-{hi}"
    return (band, label, approximate) if band else (0, "", False)


# notes that mark a row as covering only part of cannabis or part of the country
PARTIAL = re.compile(r"herb|resin|other types|flemish|french|capital|region|city|province", re.I)


def readable(coverage):
    """UNODC's (SS) 15 - 16 → ages 15–16, school survey"""
    school = "(SS)" in coverage
    text = re.sub(r"\s*\(SS\)\s*", "", coverage)
    text = re.sub(r"(\d)\s*-\s*(\d)", "\\1–\\2", text).strip()
    text = text if not re.match(r"\d", text) else "ages " + text
    return f"{text}, school survey" if school else text


def youth():
    rows = read_sheet("datasets/unodc-wdr2026-1.4-prevalence-youth.xlsx", "Cannabis")
    head = rows[3]
    at = {re.sub(r"\s+", " ", h).strip(): i for i, h in enumerate(head)}
    missed = set()
    match = matcher(country_files(), missed)
    latest = {}
    for r in rows[4:]:
        r = r + [""] * (len(head) - len(r))
        name, coverage = r[at["Country/ Territory"]], re.sub(r"\s+", " ", r[at["Coverage (age/grade)"]]).strip()
        past_year, note = r[at["Past Year"]].strip(), r[at["Notes"]].strip()
        years = re.findall(r"\d{4}", r[at["Year of Estimate"]])
        if not name.strip() or not re.search(r"15\s*-\s*16", coverage) or not past_year or not years or PARTIAL.search(note):
            continue
        cid = match(name)
        year = int(years[-1])
        if cid and (cid, year) not in latest:
            num = lambda v: round(float(v), 2) if v.strip() else ""
            latest[(cid, year)] = [cid, name.strip(), readable(coverage), year, num(r[at["Lifetime"]]), num(past_year), num(r[at["Past Month"]]), r[at["Source"]].strip(), note]
    write("datasets/unodc-cannabis-use-youth.csv", ["country", "unodc_name", "coverage", "year", "lifetime", "past_year", "past_month", "source", "note"], sorted(latest.values()))
    print(f"{len(latest)} rows for {len({k[0] for k in latest})} countries written")
    return missed


def seizures():
    rows = read_sheet("datasets/unodc-wdr2026-7.1-drug-seizures.xlsx", "Seizures")
    head = rows[1]
    at = {h: i for i, h in enumerate(head)}
    missed = set()
    match = matcher(country_files(), missed)
    kinds = {"Cannabis herb (marijuana)": "herb_kg", "Cannabis resin (hashish)": "resin_kg"}
    out = {}
    for r in rows[2:]:
        r = r + [""] * (len(head) - len(r))
        kind = kinds.get(r[at["DrugSubGroup"]])
        kg, year = r[at["Kilograms"]], r[at["Reference year"]]
        if not kind or kg == "" or not year.isdigit():
            continue
        cid = match(r[at["Country"]])
        if not cid:
            continue
        row = out.setdefault((cid, int(year)), {"country": cid, "unodc_name": r[at["Country"]].strip(), "year": int(year)})
        row[kind] = row.get(kind, 0) + float(kg)  # a country may report one kind in several rows
        row.setdefault("sources", set()).add(r[at["Source"]].strip())
    lines = []
    for (cid, year), row in sorted(out.items()):
        herb, resin = row.get("herb_kg"), row.get("resin_kg")
        total = (herb or 0) + (resin or 0)
        lines.append([cid, row["unodc_name"], year, "" if herb is None else round(herb), "" if resin is None else round(resin), round(total), "; ".join(sorted(row["sources"] - {""}))])
    write("datasets/unodc-cannabis-seizures.csv", ["country", "unodc_name", "year", "herb_kg", "resin_kg", "total_kg", "reported_by"], lines)
    print(f"{len(lines)} rows for {len({k[0] for k in out})} countries written")
    return missed


TASKS = {"offences": offences, "use": use, "youth": youth, "seizures": seizures}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/extract-unodc.py {'|'.join(TASKS)}")
missed = TASKS[sys.argv[1]]()
if missed:
    print("no country file for:", "; ".join(sorted(missed)), file=sys.stderr)
