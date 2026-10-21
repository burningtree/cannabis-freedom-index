"""Extracts a country-year series from an Our World in Data chart file into a CSV the site can read.

  python3 scripts/extract-owid.py civil_liberties

civil_liberties  datasets/owid-civil-liberties-vdem.csv (OWID's chart "civil-liberties-index-vdem",
                 V-Dem's civil liberties index, 0 to 1, published unchanged beside the extract):
                 every year from 1900 for the countries the site covers. Writes
                 datasets/vdem-civil-liberties.csv.

OWID names countries by ISO 3166 alpha-3 code; the World Bank's country list (fetched when the
script runs) turns those into the two-letter codes of our country files. Places with OWID's own
codes are matched by hand below; historical states and regions are left out.

Python's standard library only. Run from the project root.
"""
import csv, glob, json, os, sys, urllib.request

# OWID's own codes, and alpha-3 codes the World Bank does not list
EXTRA = {"OWID_KOS": "xk", "OWID_SML": "xs", "TWN": "tw"}
FROM = 1900


def alpha3_to_id():
    url = "https://api.worldbank.org/v2/country?format=json&per_page=400"
    with urllib.request.urlopen(url, timeout=120) as res:
        data = json.load(res)[1]
    ours = {path.split("/")[1].replace(".yaml", "") for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml")}
    out = {r["id"]: r["iso2Code"].lower() for r in data if r["iso2Code"].lower() in ours}
    out.update(EXTRA)
    return out


def civil_liberties():
    source, out = "datasets/owid-civil-liberties-vdem.csv", "datasets/vdem-civil-liberties.csv"
    ids = alpha3_to_id()
    rows, skipped = [], set()
    for r in csv.DictReader(open(source, encoding="utf-8")):
        cid = ids.get(r["code"])
        if not cid:
            skipped.add(r["entity"])
            continue
        if int(r["year"]) >= FROM and r["civ_libs_vdem__estimate_best"] != "":
            rows.append([cid, r["entity"], int(r["year"]), round(float(r["civ_libs_vdem__estimate_best"]), 3)])
    rows.sort()
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["country", "owid_name", "year", "civil_liberties"])
        w.writerows(rows)
    print(f"{len(rows)} rows for {len({r[0] for r in rows})} countries written to {out}")
    print("left out (no country file):", "; ".join(sorted(skipped)), file=sys.stderr)


TASKS = {"civil_liberties": civil_liberties}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/extract-owid.py {'|'.join(TASKS)}")
TASKS[sys.argv[1]]()
