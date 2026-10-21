"""Extracts a table of the EUDA's European Drug Report Statistical Bulletin into a CSV the site can read.

  python3 scripts/extract-euda.py cannabis_offences
  python3 scripts/extract-euda.py prices
  python3 scripts/extract-euda.py potency

cannabis_offences  datasets/euda-sb2026-dlo-03-2-0-cannabis-use-offences.xml, table DLO-03-2-0
                   (drug law offences > offences/offenders > cannabis > use), as the EUDA's data
                   service returns it: one figure per country and year from 2007. Writes
                   datasets/euda-cannabis-use-offences.csv, one row per country and year with a
                   figure.

prices, potency    the retail mean price in euros per gram (tables PPP-02-1-1-1-3, resin, and
                   PPP-02-1-1-2-3, herb) or the retail mean THC content in per cent (PPP-01-1-1-1-1-3
                   and PPP-01-1-1-1-2-3), by country and year from 2002. A country may report
                   several studies ("Belgium-A", "Belgium-B"); their figures for a year are
                   averaged, and *_studies says how many there were. Writes
                   datasets/euda-cannabis-prices.csv or datasets/euda-cannabis-potency.csv.

The EUDA's site refuses scripted downloads, so the XML is saved from a browser, from
https://www.euda.europa.eu/modules/sbdata/SBDataService2026.cfc?method=fetchxml&tableid=DLO-03-2-0
and kept unchanged beside the extract.

Python's standard library only. Run from the project root.
"""
import csv, glob, re, sys, unicodedata
import xml.etree.ElementTree as ET

ALIASES = {"Türkiye": "tr", "United Kingdom": "gb", "Czechia": "cz"}


def norm(s):
    return re.sub(r"[^a-z]", "", unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower())


def our_names():
    out = {}
    for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml"):
        m = re.search(r"^name: (.+)$", open(path, encoding="utf-8").read(), re.M)
        out[norm(m.group(1).strip().strip("\"'"))] = path.split("/")[1].replace(".yaml", "")
    return out


def cannabis_offences():
    source, out = "datasets/euda-sb2026-dlo-03-2-0-cannabis-use-offences.xml", "datasets/euda-cannabis-use-offences.csv"
    root = ET.parse(source).getroot()
    years = [c.text for c in root.find("table-headers/line").findall("column")][1:]
    names, rows, missed = our_names(), [], []
    for line in root.find("table-body").findall("line"):
        cells = [c.text or "" for c in line.findall("column")]
        name = cells[0].strip()
        cid = ALIASES.get(name) or names.get(norm(name))
        if not cid:
            missed.append(name)
            continue
        for year, value in zip(years, cells[1:]):
            if value.strip():
                rows.append([cid, name, int(year), int(float(value))])
    rows.sort()
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["country", "euda_name", "year", "offences"])
        w.writerows(rows)
    print(f"{len(rows)} rows for {len({r[0] for r in rows})} countries written to {out}")
    if missed:
        print("no country file for:", "; ".join(missed), file=sys.stderr)


def by_country_year(path, names, missed):
    """{(id, year): [values of every study]} from a price or potency table"""
    root = ET.parse(path).getroot()
    head = [c.text for c in root.find("table-headers/line").findall("column")]
    out = {}
    for line in root.find("table-body").findall("line"):
        cells = [(c.text or "").strip() for c in line.findall("column")]
        name = re.sub(r"-[A-Z]$", "", cells[0])  # "Belgium-A": one of Belgium's studies
        cid = ALIASES.get(name) or names.get(norm(name))
        if not cid:
            missed.append(cells[0])
            continue
        for year, value in zip(head[2:], cells[2:]):
            try:
                figure = float(value)
            except ValueError:
                continue  # empty, or a remark instead of a figure
            out.setdefault((cid, int(year)), []).append(figure)
    return out


def kinds_table(task, sources, out):
    names, missed = our_names(), []
    tables = {kind: by_country_year(path, names, missed) for kind, path in sources.items()}
    keys = sorted(set().union(*tables.values()))
    rows = []
    for cid, year in keys:
        row = [cid, year]
        for kind in sources:
            vals = tables[kind].get((cid, year), [])
            row += [round(sum(vals) / len(vals), 2) if vals else "", len(vals) or ""]
        rows.append(row)
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["country", "year"] + [c for kind in sources for c in (kind, f"{kind}_studies")])
        w.writerows(rows)
    print(f"{task}: {len(rows)} rows for {len({r[0] for r in rows})} countries written to {out}")
    if missed:
        print("no country file for:", "; ".join(sorted(set(missed))), file=sys.stderr)


def prices():
    kinds_table("prices", {"herb_eur": "datasets/euda-sb2026-ppp-02-1-1-2-3-herb-price.xml",
                           "resin_eur": "datasets/euda-sb2026-ppp-02-1-1-1-3-resin-price.xml"}, "datasets/euda-cannabis-prices.csv")


def potency():
    kinds_table("potency", {"herb_thc": "datasets/euda-sb2026-ppp-01-1-1-1-2-3-herb-thc.xml",
                            "resin_thc": "datasets/euda-sb2026-ppp-01-1-1-1-1-3-resin-thc.xml"}, "datasets/euda-cannabis-potency.csv")


TASKS = {"cannabis_offences": cannabis_offences, "prices": prices, "potency": potency}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/extract-euda.py {'|'.join(TASKS)}")
TASKS[sys.argv[1]]()
