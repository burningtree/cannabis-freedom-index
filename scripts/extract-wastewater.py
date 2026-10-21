"""Turns the EUDA's wastewater measurements of cannabis, city by city, into one figure per country
and year the site can read.

  python3 scripts/extract-wastewater.py

datasets/euda-wastewater-cannabis-cities.csv holds the cannabis rows of the EUDA's
"Drugs in municipal wastewater in Europe: source data (2025)", table 2 (ww2025-all-data.csv),
with each site's population from table 1 (ww2025-site-info-table.csv): the daily mean load of
THC-COOH, the main metabolite of cannabis, in milligrams per day per 1,000 people. The EUDA's
site refuses scripted downloads, so the rows were read in a browser on 21 October 2026 and kept
as they were, apart from the country code "H" (Debrecen), which is Hungary.

Writes datasets/euda-wastewater-cannabis.csv: for each country and year, the mean of its cities
weighted by the population each plant serves, how many cities were measured and how many people
they serve. A load of 0 (below detection) is counted.

Python's standard library only. Run from the project root.
"""
import csv
from collections import defaultdict

cells = defaultdict(lambda: [0.0, 0, 0])  # (country, year) → [weighted sum, people, cities]
with open("datasets/euda-wastewater-cannabis-cities.csv", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        pop = int(float(r["population"]))
        cell = cells[(r["country"], int(r["year"]))]
        cell[0] += float(r["thc_cooh"]) * pop
        cell[1] += pop
        cell[2] += 1

with open("datasets/euda-wastewater-cannabis.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["country", "year", "thc_cooh", "cities", "population"])
    for (country, year), (total, people, n) in sorted(cells.items()):
        w.writerow([country, year, round(total / people, 1), n, people])
print(f"{len(cells)} country-years")
