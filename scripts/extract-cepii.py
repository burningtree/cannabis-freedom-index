"""Extracts the colonial links of each country from CEPII's GeoDist country file.

  python3 scripts/extract-cepii.py   (needs xlrd: pip install xlrd)

datasets/geo_cepii.xls is CEPII's country-level GeoDist file (Mayer & Zignago 2011), downloaded
unchanged from https://www.cepii.fr/distance/geo_cepii.xls on 21 October 2026. It names up to
four colonisers of each country (colonizer1-4, ISO 3166 alpha-3 codes) and, separately, those
whose rule was short or light (short_colonizer1-3). A country appears once per main city, so its
first row is kept.

Writes datasets/cepii-colonial-links.csv: one row per country, by its ISO alpha-2 code in lower
case, as the country files are named, with the colonisers as country file names too, joined by
spaces, and their names as CEPII writes them, joined by semicolons.
"""
import csv
import xlrd

sheet = xlrd.open_workbook("datasets/geo_cepii.xls").sheet_by_index(0)
head = sheet.row_values(0)
rows = [dict(zip(head, sheet.row_values(i))) for i in range(1, sheet.nrows)]
alpha2 = {r["iso3"]: r["iso2"].lower() for r in rows}
alpha2.update({"ROM": "ro", "ZAR": "cd", "TMP": "tl", "YUG": "rs", "PAL": "ps"})  # older codes the file uses
names = {r["iso3"]: r["country"] for r in rows}
named = lambda r, cols: "; ".join(names.get(r[c], r[c]) for c in cols if r[c] not in (".", ""))
codes = lambda r, cols: " ".join(alpha2.get(r[c], r[c].lower()) for c in cols if r[c] not in (".", ""))

seen = set()
with open("datasets/cepii-colonial-links.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["country", "iso3", "name", "colonizers", "colonizer_names", "short_colonizers"])
    for r in rows:
        if r["iso2"] in seen:
            continue
        seen.add(r["iso2"])
        w.writerow([r["iso2"].lower(), r["iso3"], r["country"], codes(r, ["colonizer1", "colonizer2", "colonizer3", "colonizer4"]),
                    named(r, ["colonizer1", "colonizer2", "colonizer3", "colonizer4"]),
                    codes(r, ["short_colonizer1", "short_colonizer2", "short_colonizer3"])])
print(len(seen), "countries")
