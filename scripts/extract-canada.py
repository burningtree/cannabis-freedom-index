"""Canada after legalisation: where people get their cannabis, and what governments earn from it.

  python3 scripts/extract-canada.py

sourcing  datasets/health-canada-cannabis-usual-source.csv, the data behind figure 3 of Health
          Canada's "Cannabis use (non-medical) in Canada" (Canadian Cannabis Survey), saved
          unchanged from https://health-infobase.canada.ca/src/data/cannabis-use/cannabisUsualSource.csv.
          Writes datasets/health-canada-cannabis-sourcing.csv: one row per survey year, the per
          cent of people who used cannabis in the past year by their usual source.

revenue   datasets/statcan-10100165.csv, Statistics Canada table 10-10-0165-01, "Net income of
          cannabis authorities and government revenue from the sale of cannabis" (thousands of
          dollars, fiscal years from April). Statistics Canada's site was unavailable on 21 October
          2026, so the file is the Internet Archive's copy of its CSV download of 11 October 2026.
          Writes datasets/statcan-cannabis-revenue.csv: Canada's figures by fiscal year, with
          `year` as the year the fiscal year starts.

Python's standard library only. Run from the project root.
"""
import csv

SOURCES = {"Legal purchase": "legal", "Social source": "social", "Illegal purchase": "illegal", "Grew my own": "grown", "Other source": "other"}
years = {}
with open("datasets/health-canada-cannabis-usual-source.csv", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        key = next((v for k, v in SOURCES.items() if r["Category"].startswith(k)), None)
        if key and r["Value"] not in ("", "n/a"):
            years.setdefault(int(r["Year"]), {})[key] = r["Value"]
with open("datasets/health-canada-cannabis-sourcing.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["country", "year", *SOURCES.values()])
    for y in sorted(years):
        w.writerow(["ca", y, *(years[y].get(k, "") for k in SOURCES.values())])

LINES = {
    "Cannabis authority sales": "sales",
    "Net income of cannabis authorities": "net_income",
    "Federal excise tax and customs duties": "federal_excise",
    "Provincial and territorial excise tax": "provincial_excise",
    "Total taxes and other revenue": "taxes",
    "Net income of cannabis authorities and total taxes and other revenue": "revenue",
}
fiscal = {}
with open("datasets/statcan-10100165.csv", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        if r["GEO"] == "Canada" and r["Cannabis revenue"] in LINES and r["VALUE"]:
            fiscal.setdefault(r["REF_DATE"], {})[LINES[r["Cannabis revenue"]]] = r["VALUE"]
with open("datasets/statcan-cannabis-revenue.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["country", "year", "fiscal_year", *LINES.values()])
    for fy in sorted(fiscal):
        w.writerow(["ca", fy[:4], fy, *(fiscal[fy].get(k, "") for k in LINES.values())])
print(len(years), "survey years,", len(fiscal), "fiscal years")
