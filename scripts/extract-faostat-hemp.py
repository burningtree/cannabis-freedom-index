"""Extracts hemp from FAOSTAT's crops and livestock production file into a CSV the site can read.

  python3 scripts/extract-faostat-hemp.py <path to the downloaded zip>

The zip is FAOSTAT's bulk download "Production: Crops and livestock products" (dataset QCL),
https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip
(about 34 MB, 545 MB unpacked, so it is not kept in the repository). The file is read as a
stream, keeping two items, "True hemp, raw or retted" (fibre, item 777) and "Hempseed" (item
336), with their production in tonnes and area harvested in hectares, for every year.

Writes datasets/faostat-hemp.csv: one row per country and year. A country is matched by its M49
code, which is the ISO numeric code in our country files (iso_numeric). Regional aggregates and
FAO's "China" (which adds Taiwan, Hong Kong and Macao to mainland China) are left out; states
that no longer exist (the USSR, Czechoslovakia, Yugoslavia) are kept with an empty `country`.
Each figure keeps FAO's flag: A official, E estimated, I imputed, X from another international
body; M (missing) figures are left empty. `hemp_ha` is the larger of the fibre and seed areas:
the two overlap where one crop is grown for both, so they are not added.

Python's standard library only. Run from the project root.
"""
import csv, glob, io, re, sys, zipfile

ITEMS = {"777": "fibre", "336": "seed"}
ELEMENTS = {"5510": "t", "5312": "ha"}
CHINA_AGGREGATE = "351"
OUT = "datasets/faostat-hemp.csv"


def iso_numeric():
    """ISO numeric code → country file name"""
    out = {}
    for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml"):
        m = re.search(r"^iso_numeric: (\d+)$", open(path, encoding="utf-8").read(), re.M)
        if m:
            out[int(m.group(1))] = path.split("/")[1].replace(".yaml", "")
    return out


def main(zip_path):
    ids = iso_numeric()
    z = zipfile.ZipFile(zip_path)
    name = next(n for n in z.namelist() if n.endswith("All_Data_(Normalized).csv"))
    rows = {}  # (m49, year) → row
    with z.open(name) as raw:
        reader = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8", errors="replace"))
        for r in reader:
            item, element = ITEMS.get(r["Item Code"]), ELEMENTS.get(r["Element Code"])
            if not item or not element or int(r["Area Code"]) >= 5000 or r["Area Code"] == CHINA_AGGREGATE:
                continue
            m49 = int(r["Area Code (M49)"].lstrip("'"))
            key = (m49, int(r["Year"]))
            row = rows.setdefault(key, {"country": ids.get(m49, ""), "m49": m49, "area": r["Area"], "year": int(r["Year"])})
            if r["Value"] != "" and r["Flag"] != "M":
                row[f"{item}_{element}"] = round(float(r["Value"]))
                row[f"{item}_{element}_flag"] = r["Flag"]
    for r in rows.values():
        areas = [r[k] for k in ("fibre_ha", "seed_ha") if k in r]
        if areas:
            r["hemp_ha"] = max(areas)
    cols = ["country", "m49", "area", "year", "hemp_ha"] + [f"{i}_{e}{f}" for i in ITEMS.values() for e in ELEMENTS.values() for f in ("", "_flag")]
    # a year with no figure at all says nothing
    kept = [r for r in rows.values() if any(k in r for k in ("fibre_t", "fibre_ha", "seed_t", "seed_ha"))]
    with open(OUT, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols, lineterminator="\n")
        w.writeheader()
        w.writerows(sorted(kept, key=lambda r: (r["country"] or "~" + r["area"], r["year"])))
    places = {r["country"] or r["area"] for r in kept}
    print(f"{len(kept)} rows for {len(places)} places written to {OUT}")
    print("former states kept without a country:", "; ".join(sorted({r["area"] for r in kept if not r["country"]})))


if len(sys.argv) != 2:
    sys.exit("usage: python3 scripts/extract-faostat-hemp.py <path to Production_Crops_Livestock_E_All_Data_(Normalized).zip>")
main(sys.argv[1])
