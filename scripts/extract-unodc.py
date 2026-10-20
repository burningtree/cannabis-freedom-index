"""Extracts tables from UNODC's World Drug Report annex into CSVs the site can read.

  python3 scripts/extract-unodc.py offences
  python3 scripts/extract-unodc.py use
  python3 scripts/extract-unodc.py youth

The spreadsheets are kept in /datasets as downloaded from
https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2026-annex.html

offences  table 10.1, sheet "Formal contact": persons brought into contact with the police for
          "Offences related to drug use and/or drug possession", any illicit drug, the latest
          year with a figure for each country. Writes datasets/unodc-drug-possession-police.csv.

use       table 1.2, sheet "Cannabis": past-year cannabis use, the latest survey for each
          country. Rewrites datasets/unodc-cannabis-use.csv, one row for every country file:
            source  "wdr2026" from the table; "earlier" a figure from before this table was
                    used (Wikipedia's list of older UNODC figures), kept where the table has
                    none; "estimate" the median of the measured countries in the same region
            users   the share applied to the population aged 15 to 64 from the World Bank
                    (fetched when the script runs), to two significant figures
          Places the World Bank does not list keep the population the file already had.

youth     table 1.4, sheet "Cannabis": cannabis use among 15- and 16-year-olds, the latest
          survey with a past-year figure for each country. Rows about one kind of cannabis
          (herb or resin only) or one part of a country are left out; the age group is
          written out ("(SS) 15 - 16" becomes "ages 15–16, school survey"). Writes
          datasets/unodc-cannabis-use-youth.csv.

Python's standard library only. A country name that matches no country file is listed, so that
an alias can be added below. Run from the project root.
"""
import csv, glob, json, re, statistics, sys, unicodedata, urllib.request, zipfile
import xml.etree.ElementTree as ET

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
        if cid and (cid not in latest or int(year) > int(latest[cid][2])):
            latest[cid] = [cid, r[at["Country"]], year, int(float(total)), note]
    write("datasets/unodc-drug-possession-police.csv", ["country", "unodc_name", "year", "persons", "year_note"], sorted(latest.values()))
    print(f"{len(latest)} countries written")
    return missed


def two_figures(n):
    """3,712,345 → 3,700,000; 8,712 → 8,700"""
    if n <= 0:
        return 0
    digits = len(str(int(n))) - 2
    return int(round(n, -digits)) if digits > 0 else int(round(n))


def world_bank_15_64():
    url = "https://api.worldbank.org/v2/country/all/indicator/SP.POP.1564.TO?format=json&per_page=20000&date=2015:2030"
    with urllib.request.urlopen(url, timeout=120) as res:
        data = json.load(res)[1]
    latest = {}
    for r in data:
        cid = r["country"]["id"].lower()
        if r["value"] is not None and (cid not in latest or int(r["date"]) > latest[cid][0]):
            latest[cid] = (int(r["date"]), int(r["value"]))
    return latest


def use():
    rows = read_sheet("datasets/unodc-wdr2026-1.2-prevalence-national.xlsx", "Cannabis")
    head = rows[2]
    at = {h: i for i, h in enumerate(head)}
    files = country_files()
    missed = set()
    match = matcher(files, missed)
    # the latest survey per country; a period such as "2022/23" counts as its last year
    surveys = {}
    for r in rows[3:]:
        r = r + [""] * (len(head) - len(r))
        name, best, period = r[at["Country/Territory"]], r[at["Best"]], str(r[at["Year"]]).strip()
        if not name.strip() or best == "" or not re.search(r"\d{4}", period):
            continue
        end = re.findall(r"\d{2,4}", period)[-1]
        year = int(end) if len(end) == 4 else int(period[:2] + end)
        cid = match(name)
        if cid and (cid not in surveys or year > surveys[cid]["year"]):
            surveys[cid] = {"prevalence": round(float(best), 2), "year": year, "period": period,
                            "ages": r[at["Age"]].strip(), "unodc_name": name.strip()}
    # what the file had before: earlier figures, and a population for places the World Bank lacks
    before = {r["country"]: r for r in csv.DictReader(open("datasets/unodc-cannabis-use.csv", encoding="utf-8"))}
    wb = world_bank_15_64()
    out = {}
    for cid in files:
        old = before.get(cid, {})
        if cid in surveys:
            row = {**surveys[cid], "source": "wdr2026"}
        elif old and old.get("estimate") != "true" and old.get("source", "earlier") == "earlier":
            row = {"prevalence": float(old["prevalence"]), "year": int(old["year"]), "period": old.get("period") or old["year"],
                   "ages": old.get("ages", ""), "unodc_name": "", "source": "earlier"}
        else:
            row = {"source": "estimate"}
        if cid in wb:
            row["population_year"], row["population_15_64"] = wb[cid]
        elif old.get("population_15_64"):
            row["population_year"], row["population_15_64"] = old.get("population_year", ""), int(old["population_15_64"])
        elif old and float(old["prevalence"]) > 0:
            # the population the old users figure was worked out from
            row["population_year"], row["population_15_64"] = "", int(round(int(old["users"]) / (float(old["prevalence"]) / 100)))
        else:
            row["population_year"], row["population_15_64"] = "", 0
        out[cid] = row
    # no survey at all: the median of the measured countries in the same region
    for cid, row in out.items():
        if row["source"] == "estimate":
            region = files[cid][1]
            row["prevalence"] = round(statistics.median(r["prevalence"] for k, r in out.items() if r["source"] != "estimate" and files[k][1] == region), 2)
    lines = []
    for cid in sorted(out):
        r = out[cid]
        users = two_figures(r["population_15_64"] * r["prevalence"] / 100)
        lines.append([cid, files[cid][0], r.get("unodc_name", ""), r["prevalence"], r.get("year", ""), r.get("period", ""), r.get("ages", ""),
                      "true" if r["source"] == "estimate" else "", r["source"], r["population_15_64"] or "", r["population_year"], users])
    write("datasets/unodc-cannabis-use.csv",
          ["country", "name", "unodc_name", "prevalence", "year", "period", "ages", "estimate", "source", "population_15_64", "population_year", "users"], lines)
    counts = {s: sum(1 for r in out.values() if r["source"] == s) for s in ("wdr2026", "earlier", "estimate")}
    print(f"{len(out)} countries written: {counts}")
    return missed


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
        if cid and (cid not in latest or year > latest[cid][3]):
            num = lambda v: round(float(v), 2) if v.strip() else ""
            latest[cid] = [cid, name.strip(), readable(coverage), year, num(r[at["Lifetime"]]), num(past_year), num(r[at["Past Month"]]), r[at["Source"]].strip(), note]
    write("datasets/unodc-cannabis-use-youth.csv", ["country", "unodc_name", "coverage", "year", "lifetime", "past_year", "past_month", "source", "note"], sorted(latest.values()))
    print(f"{len(latest)} countries written")
    return missed


TASKS = {"offences": offences, "use": use, "youth": youth}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/extract-unodc.py {'|'.join(TASKS)}")
missed = TASKS[sys.argv[1]]()
if missed:
    print("no country file for:", "; ".join(sorted(missed)), file=sys.stderr)
