"""Fetches open, non-governmental datasets from their public APIs into CSVs the site can read.

  python3 scripts/fetch-open-data.py gbif      # records of the cannabis plant, by country and year
  python3 scripts/fetch-open-data.py openalex  # research papers about cannabis, by country and year

gbif      GBIF occurrence search, genus Cannabis (all its species and synonyms), faceted by the
          country where a record was made and by year: every year with a record. Writes
          datasets/gbif-cannabis-records.csv with the records of each year and the running
          total of dated records; the last row of a country also says how many of its records
          have no year (`undated`), which count in no year.
openalex  OpenAlex works whose title or abstract mention cannabis, marijuana, marihuana or a
          cannabinoid, grouped by the countries of their authors' institutions, every year from
          1950 to last year. A paper counts once for each country among its authors. Writes
          datasets/openalex-cannabis-papers.csv.
The OpenStreetMap count of cannabis shops is made by scripts/osm-shops.mjs, which needs the
map's country shapes.

Python's standard library only. Run from the project root.
"""
import csv, datetime, glob, json, os, re, sys, tempfile, time, urllib.parse, urllib.request

AGENT = "cannabis-freedom-index dataset script (https://github.com/burningtree/cannabis-freedom-index)"


def get(url, data=None, tries=4):
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers={"User-Agent": AGENT})
            with urllib.request.urlopen(req, timeout=180) as res:
                return json.load(res)
        except Exception as err:  # a busy server: wait and try again
            if attempt == tries - 1:
                raise
            print(f"  retrying after {err}", file=sys.stderr)
            time.sleep(10 * (attempt + 1))


def our_ids():
    """two-letter code → country file name, for the files whose code is a real ISO code"""
    ids = {}
    for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml"):
        cid = path.split("/")[1].replace(".yaml", "")
        ids[cid.upper()] = cid
    return ids


def write(path, head, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(head)
        w.writerows(rows)
    print(f"{len(rows)} rows for {len({r[0] for r in rows})} countries written to {path}")


def gbif():
    genus = get("https://api.gbif.org/v1/species/match?rank=GENUS&name=Cannabis")["usageKey"]
    ids = our_ids()
    countries = get(f"https://api.gbif.org/v1/occurrence/search?taxonKey={genus}&facet=country&facetLimit=400&limit=0")["facets"][0]["counts"]
    rows = []
    for c in countries:
        cid = ids.get(c["name"])
        if not cid:
            continue
        years = get(f"https://api.gbif.org/v1/occurrence/search?taxonKey={genus}&country={c['name']}&facet=year&facetLimit=1000&limit=0")["facets"]
        total, first = 0, len(rows)
        for y in sorted((years[0]["counts"] if years else []), key=lambda y: int(y["name"])):
            total += y["count"]
            rows.append([cid, int(y["name"]), y["count"], total, ""])
        if len(rows) > first:
            rows[-1][4] = c["count"] - total
        time.sleep(0.2)
    write("datasets/gbif-cannabis-records.csv", ["country", "year", "records", "records_total", "undated"], rows)


def openalex():
    ids = our_ids()
    search = "cannabis|marijuana|marihuana|cannabinoid"
    rows = []
    for year in range(1950, datetime.date.today().year):
        url = ("https://api.openalex.org/works?" + urllib.parse.urlencode({
            "filter": f"title_and_abstract.search:{search},publication_year:{year}",
            "group_by": "authorships.countries", "per_page": 200}))
        for g in get(url)["group_by"]:
            cid = ids.get(g["key"].rsplit("/", 1)[-1])
            if cid:
                rows.append([cid, year, g["count"]])
        time.sleep(0.2)
    rows.sort()
    write("datasets/openalex-cannabis-papers.csv", ["country", "year", "papers"], rows)


TASKS = {"gbif": gbif, "openalex": openalex}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/fetch-open-data.py {'|'.join(TASKS)}")
TASKS[sys.argv[1]]()
