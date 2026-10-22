"""Fetches open datasets from their public APIs into CSVs the site can read.

  python3 scripts/fetch-open-data.py gbif        # records of the cannabis plant, by country and year
  python3 scripts/fetch-open-data.py openalex    # research papers about cannabis, by country and year
  python3 scripts/fetch-open-data.py alcohol     # alcohol drunk per person (WHO, via Our World in Data)
  python3 scripts/fetch-open-data.py governance  # government effectiveness (World Bank WGI)
  python3 scripts/fetch-open-data.py minwage     # monthly minimum wages in euros (Eurostat)
  python3 scripts/fetch-open-data.py corruption  # Corruption Perceptions Index (Transparency International, via OWID)
  python3 scripts/fetch-open-data.py religion    # the most common religion (Pew, via OWID)
  python3 scripts/fetch-open-data.py gdp         # GDP per person at purchasing power parity (World Bank)
  python3 scripts/fetch-open-data.py wikipedia   # monthly readers of the cannabis article, by language
  python3 scripts/fetch-open-data.py development # internet, towns, schooling, age and health (World Bank)
  python3 scripts/fetch-open-data.py books       # how often books name cannabis, by language (Google Books Ngram)
  python3 scripts/fetch-open-data.py trials      # clinical trials of cannabis medicines, by country and year
  python3 scripts/fetch-open-data.py parties     # political parties founded to legalise cannabis (Wikidata)
  python3 scripts/fetch-open-data.py news        # the share of each country's news that mentions cannabis (GDELT)

gbif      GBIF occurrence search, genus Cannabis (all its species and synonyms), faceted by the
          country where a record was made and by year: every year with a record. Writes
          datasets/gbif-cannabis-records.csv with the records of each year and the running
          total of dated records; the last row of a country also says how many of its records
          have no year (`undated`), which count in no year.
openalex  OpenAlex works whose title or abstract mention cannabis, marijuana, marihuana or a
          cannabinoid, grouped by the countries of their authors' institutions, every year from
          1950 to last year. A paper counts once for each country among its authors. Writes
          datasets/openalex-cannabis-papers.csv.
alcohol   Our World in Data's chart "Total alcohol consumption per capita", the WHO's estimate of
          litres of pure alcohol drunk per person aged 15 or over in a year, recorded and
          unrecorded. Writes datasets/owid-alcohol-consumption.csv, every year of every country.
governance  The World Bank's Worldwide Governance Indicators, government effectiveness: an
          estimate from about -2.5 to 2.5 of the quality of public services and of the state's
          ability to carry out its policies, and the same on a scale of 0 to 100, every year from 1996.
          Writes datasets/wb-government-effectiveness.csv.
minwage   Eurostat table earn_mw_cur, the national monthly minimum wage in euros, twice a year
          (January and July); countries without a national minimum wage have no figure. Writes
          datasets/eurostat-minimum-wages.csv with the January figure of each year.
corruption  Transparency International's Corruption Perceptions Index, 0 (highly corrupt) to 100
          (very clean), as Our World in Data republishes it, every year from 2012. Writes
          datasets/owid-corruption-perceptions.csv.
religion  Pew Research Center's estimate of the religious group with the largest share of each
          country's people in 2010 and 2020, as Our World in Data republishes it. Writes
          datasets/owid-most-common-religion.csv.
gdp       The World Bank's GDP per person at purchasing power parity, in constant 2021
          international dollars (NY.GDP.PCAP.PP.KD), every year from 1990. Writes
          datasets/wb-gdp-per-person.csv.
wikipedia Monthly page views by people (not bots) of the Wikipedia article on cannabis as a drug,
          in the languages spoken mainly in one country, from July 2015, from the Wikimedia
          pageviews API; the article in each language is the one the English "Cannabis (drug)"
          links to. Writes datasets/wikipedia-cannabis-views.csv with the country, the month (also as
          a fraction of a year, `time`), the language, the article and each month's views.
development  Five World Bank indicators, every year from 1990: the share of people using the
          internet (IT.NET.USER.ZS), living in towns and cities (SP.URB.TOTL.IN.ZS) and aged 65 or
          over (SP.POP.65UP.TO.ZS), life expectancy at birth (SP.DYN.LE00.IN) and the gross
          enrolment ratio in higher education (SE.TER.ENRR). Writes
          datasets/wb-development.csv, one row per country and year with any of them.
books     Google Books Ngram Viewer, the share of all words in each year's printed books taken by
          each name of the drug, in six languages, 1800 to 2022, unsmoothed, per billion words.
          Worldwide: books are counted by language, not by country. Writes
          datasets/ngram-cannabis-words.csv.
trials    ClinicalTrials.gov (API v2): every registered study whose intervention mentions cannabis,
          cannabidiol, THC, dronabinol, nabilone, nabiximols or a cannabinoid, counted once for
          each country where it has a site, by the year it started, with the running total; studies that have not started yet
          are left out. Writes
          datasets/clinicaltrials-cannabis.csv.
parties   Wikidata: political parties whose name or ideology mentions cannabis, with their country
          and the year they were founded (and dissolved, if they were). Writes
          datasets/wikidata-cannabis-parties.csv, one row per party.
news      The GDELT Project's DOC 2.0 API: for the online news published in each country, the
          share of articles that mention cannabis or marijuana (GDELT matches the words in 65
          languages through its own translation), day by day from 2017, averaged here by year (`days` is how many days a year has).
          Countries are asked for by name, one every ten seconds and after a minute's wait when
          GDELT refuses, so a run takes about forty minutes. Writes datasets/gdelt-cannabis-news.csv.
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


def iso3_ids():
    """three-letter code → country file name, from the World Bank's list of economies"""
    ids, alpha2 = our_ids(), {}
    for c in get("https://api.worldbank.org/v2/country?format=json&per_page=400")[1]:
        if c["iso2Code"] in ids:
            alpha2[c["id"]] = ids[c["iso2Code"]]
    return alpha2


def alcohol():
    ids = iso3_ids()
    url = "https://ourworldindata.org/grapher/total-alcohol-consumption-per-capita-litres-of-pure-alcohol.csv?v=1&csvType=full&useColumnShortNames=true"
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": AGENT}), timeout=180) as res:
        lines = res.read().decode("utf-8").splitlines()
    rows = [[ids[r["code"]], int(r["year"]), r["sh_alc_pcap_li"]] for r in csv.DictReader(lines) if r["code"] in ids and r["sh_alc_pcap_li"]]
    rows.sort()
    write("datasets/owid-alcohol-consumption.csv", ["country", "year", "litres"], rows)


def governance():
    ids = iso3_ids()
    rows = {}
    for indicator, col in [("GOV_WGI_GE.EST", 0), ("GOV_WGI_GE.SC", 1)]:
        url = f"https://api.worldbank.org/v2/country/all/indicator/{indicator}?format=json&per_page=20000&source=3"
        for r in get(url)[1]:
            cid = ids.get(r["countryiso3code"])
            if cid and r["value"] is not None:
                rows.setdefault((cid, int(r["date"])), [None, None])[col] = round(r["value"], 3)
    write("datasets/wb-government-effectiveness.csv", ["country", "year", "effectiveness", "score"],
          sorted([cid, year, *v] for (cid, year), v in rows.items()))


def minwage():
    ids = our_ids() | {"EL": "gr", "UK": "gb"}
    d = get("https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_cur?format=JSON&lang=EN&currency=EUR")
    geo, time_ = d["dimension"]["geo"]["category"]["index"], d["dimension"]["time"]["category"]["index"]
    rows = []
    for g, gi in geo.items():
        for t, ti in time_.items():
            v = d["value"].get(str(gi * len(time_) + ti))
            if g in ids and t.endswith("S1") and v is not None:
                rows.append([ids[g], int(t[:4]), v])
    rows.sort()
    write("datasets/eurostat-minimum-wages.csv", ["country", "year", "monthly_eur"], rows)


def owid_csv(slug):
    url = f"https://ourworldindata.org/grapher/{slug}.csv?v=1&csvType=full&useColumnShortNames=true"
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": AGENT}), timeout=180) as res:
        return list(csv.DictReader(res.read().decode("utf-8").splitlines()))


def corruption():
    ids = iso3_ids()
    rows = sorted([ids[r["code"]], int(r["year"]), r["cpi_score"]] for r in owid_csv("ti-corruption-perception-index") if r["code"] in ids and r["cpi_score"])
    write("datasets/owid-corruption-perceptions.csv", ["country", "year", "cpi"], rows)


def religion():
    ids = iso3_ids()
    rows = sorted([ids[r["code"]], int(r["year"]), r["most_popular_religion"]] for r in owid_csv("most-common-religion") if r["code"] in ids and r["most_popular_religion"])
    write("datasets/owid-most-common-religion.csv", ["country", "year", "religion"], rows)


def gdp():
    ids = iso3_ids()
    rows = []
    for r in get("https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.PP.KD?format=json&per_page=20000&date=1990:2030")[1]:
        cid = ids.get(r["countryiso3code"])
        if cid and r["value"] is not None:
            rows.append([cid, int(r["date"]), round(r["value"])])
    write("datasets/wb-gdp-per-person.csv", ["country", "year", "gdp_ppp"], sorted(rows))


DEVELOPMENT = {"internet": "IT.NET.USER.ZS", "urban": "SP.URB.TOTL.IN.ZS", "aged_65": "SP.POP.65UP.TO.ZS",
               "life_expectancy": "SP.DYN.LE00.IN", "higher_education": "SE.TER.ENRR"}


def development():
    ids = iso3_ids()
    cells = {}
    for k, (name, code) in enumerate(DEVELOPMENT.items()):
        for r in get(f"https://api.worldbank.org/v2/country/all/indicator/{code}?format=json&per_page=20000&date=1990:2030")[1]:
            cid = ids.get(r["countryiso3code"])
            if cid and r["value"] is not None:
                cells.setdefault((cid, int(r["date"])), [""] * len(DEVELOPMENT))[k] = round(r["value"], 1)
    write("datasets/wb-development.csv", ["country", "year", *DEVELOPMENT], sorted([cid, year, *v] for (cid, year), v in cells.items()))


# names of the drug in each language corpus of Google Books
NGRAM_WORDS = {
    "en": ["cannabis", "marijuana", "hashish", "hemp"],
    "de": ["Cannabis", "Haschisch", "Marihuana", "Hanf"],
    "fr": ["cannabis", "haschisch", "marijuana", "chanvre"],
    "es": ["cannabis", "marihuana", "hachís", "cáñamo"],
    "it": ["cannabis", "hashish", "marijuana", "canapa"],
    "ru": ["конопля", "гашиш", "марихуана", "каннабис"],
}


def books():
    rows = []
    for corpus, words in NGRAM_WORDS.items():
        url = "https://books.google.com/ngrams/json?" + urllib.parse.urlencode(
            {"content": ",".join(words), "year_start": 1800, "year_end": 2022, "corpus": corpus, "smoothing": 0, "case_insensitive": "true"})
        series = get(url)
        # asked case-insensitively, the viewer returns each spelling and, where there are several, their
        # sum as "word (All)": keep the sum, or the one spelling where there is no sum
        by_word = {}
        for s_ in series:
            word = s_["ngram"].replace(" (All)", "")
            if s_["ngram"].endswith(" (All)") or word.lower() not in by_word:
                by_word[word.lower()] = (word, s_["timeseries"])
        for word, ts in by_word.values():
            rows += [[corpus, 1800 + i, word.lower(), round(v * 1e9, 2)] for i, v in enumerate(ts)]
        time.sleep(2)
    with open("datasets/ngram-cannabis-words.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["corpus", "year", "word", "per_billion"])
        w.writerows(rows)
    print(f"{len(rows)} rows written to datasets/ngram-cannabis-words.csv")


TRIAL_NAMES = {"Korea, Republic of": "kr", "Turkey (Türkiye)": "tr", "Russian Federation": "ru", "Iran, Islamic Republic of": "ir", "Turkey": "tr", "Türkiye": "tr",
               "Czech Republic": "cz", "Taiwan": "tw", "Moldova, Republic of": "md", "Macedonia, The Former Yugoslav Republic of": "mk",
               "Viet Nam": "vn", "Hong Kong": "hk", "Congo, The Democratic Republic of the": "cd", "Tanzania": "tz", "Bolivia": "bo",
               "Venezuela": "ve", "Syrian Arab Republic": "sy", "Côte D'Ivoire": "ci", "Lao People's Democratic Republic": "la"}


def trials():
    names = {}
    for path in glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml"):
        m = re.search(r"^name: (.+)$", open(path, encoding="utf-8").read(), re.M)
        names[m.group(1).strip().strip("\"'")] = path.split("/")[1].replace(".yaml", "")
    names |= TRIAL_NAMES
    terms = "cannabis OR cannabidiol OR THC OR dronabinol OR nabilone OR nabiximols OR cannabinoid OR marijuana"
    counts, token, missed = {}, None, set()
    while True:
        q = {"query.intr": terms, "fields": "NCTId,LocationCountry,StartDate", "pageSize": 1000}
        if token:
            q["pageToken"] = token
        page = get("https://clinicaltrials.gov/api/v2/studies?" + urllib.parse.urlencode(q))
        for st in page["studies"]:
            ps = st["protocolSection"]
            start = ps.get("statusModule", {}).get("startDateStruct", {}).get("date", "")[:4]
            for country in {loc.get("country") for loc in ps.get("contactsLocationsModule", {}).get("locations", []) if loc.get("country")}:
                cid = names.get(country)
                if not cid:
                    missed.add(country); continue
                # a study planned for a later year has not started: it is left out
                if start and int(start) <= datetime.date.today().year:
                    counts[(cid, int(start))] = counts.get((cid, int(start)), 0) + 1
        token = page.get("nextPageToken")
        if not token:
            break
    if missed:
        print("no country file for:", "; ".join(sorted(missed)), file=sys.stderr)
    rows, total = [], {}
    for (c, y), n in sorted(counts.items()):
        total[c] = total.get(c, 0) + n
        rows.append([c, y, n, total[c]])
    write("datasets/clinicaltrials-cannabis.csv", ["country", "year", "trials", "to_date"], rows)


def parties():
    query = """SELECT DISTINCT ?p ?pLabel ?iso ?inception ?dissolved WHERE {
      ?p wdt:P31/wdt:P279* wd:Q7278 .
      { ?p wdt:P1142 ?ideology . ?ideology rdfs:label ?il . FILTER(LANG(?il) = "en" && CONTAINS(LCASE(?il), "cannabis")) }
      UNION { ?p rdfs:label ?name . FILTER(LANG(?name) = "en" && (CONTAINS(LCASE(?name), "cannabis") || CONTAINS(LCASE(?name), "marijuana") || CONTAINS(LCASE(?name), "hemp"))) }
      ?p wdt:P17 ?country . ?country wdt:P297 ?iso .
      OPTIONAL { ?p wdt:P571 ?inception } OPTIONAL { ?p wdt:P576 ?dissolved }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } }"""
    data = get("https://query.wikidata.org/sparql?" + urllib.parse.urlencode({"query": query, "format": "json"}))
    ids, rows, seen = our_ids(), [], set()
    for b in data["results"]["bindings"]:
        qid = b["p"]["value"].rsplit("/", 1)[-1]
        cid = ids.get(b["iso"]["value"])
        if not cid or qid in seen:
            continue
        seen.add(qid)
        year = b.get("inception", {}).get("value", "")[:4]
        rows.append([cid, year, b["pLabel"]["value"], qid, b.get("dissolved", {}).get("value", "")[:4]])
    write("datasets/wikidata-cannabis-parties.csv", ["country", "year", "party", "wikidata", "dissolved"], sorted(rows))


# names GDELT spells differently from the country files
GDELT_NAMES = {"us": "unitedstates", "gb": "unitedkingdom", "cz": "czechrepublic", "kr": "southkorea", "kp": "northkorea",
               "cd": "democraticrepublicofthecongo", "cg": "republicofthecongo", "ci": "ivorycoast", "mk": "macedonia",
               "tr": "turkey", "sz": "swaziland", "cv": "capeverde", "tl": "easttimor", "mm": "burma"}


def news():
    rows = []
    for path in sorted(glob.glob("countries/*.yaml") + glob.glob("countries/*/index.yaml")):
        text = open(path, encoding="utf-8").read()
        if re.search(r"^(disputed|dependency):", text, re.M):
            continue
        cid = path.split("/")[1].replace(".yaml", "")
        name = GDELT_NAMES.get(cid) or re.sub(r"[^a-z]", "", re.search(r"^name: (.+)$", text, re.M).group(1).lower())
        url = ("https://api.gdeltproject.org/api/v2/doc/doc?" + urllib.parse.urlencode({
            "query": f"(cannabis OR marijuana) sourcecountry:{name}", "mode": "timelinevol", "timelinesmooth": 0,
            "format": "json", "startdatetime": "20170101000000", "enddatetime": datetime.date.today().replace(day=1).strftime("%Y%m%d000000")}))
        data = None
        for attempt in range(5):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": AGENT})
                with urllib.request.urlopen(req, timeout=180) as res:
                    body = res.read().decode("utf-8")
                data = (json.loads(body).get("timeline") or []) if body.startswith("{") else []  # an unknown name answers with text
                break
            except urllib.error.HTTPError as err:  # too many requests: wait a minute and ask again
                if err.code != 429:
                    raise
                time.sleep(60)
        if data is None:
            print(f"  {cid} ({name}): still refused, left out", file=sys.stderr)
            data = []
        years = {}
        for d in (data[0]["data"] if data else []):
            years.setdefault(int(d["date"][:4]), []).append(d["value"])
        if any(v for vs in years.values() for v in vs):
            for y, vs in sorted(years.items()):
                rows.append([cid, y, round(sum(vs) / len(vs), 4), len(vs)])
        time.sleep(10)
    write("datasets/gdelt-cannabis-news.csv", ["country", "year", "share", "days"], rows)


# languages spoken mainly in one country: language → country file name
WIKI_LANGS = {"de": "de", "cs": "cz", "th": "th", "nl": "nl", "pl": "pl", "ja": "jp", "ko": "kr", "it": "it", "sv": "se",
              "uk": "ua", "hu": "hu", "he": "il", "tr": "tr", "da": "dk", "fi": "fi", "sk": "sk", "sl": "si", "hr": "hr",
              "el": "gr", "ro": "ro", "bg": "bg", "lt": "lt", "lv": "lv", "et": "ee", "ka": "ge", "id": "id"}


def wikipedia():
    links = get("https://en.wikipedia.org/w/api.php?action=query&titles=Cannabis_(drug)&prop=langlinks&lllimit=500&format=json")
    titles = {l["lang"]: l["*"] for l in next(iter(links["query"]["pages"].values()))["langlinks"]}
    end = datetime.date.today().replace(day=1).strftime("%Y%m%d")
    rows = []
    for lang, cid in WIKI_LANGS.items():
        title = titles.get(lang)
        if not title:
            continue
        url = (f"https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{lang}.wikipedia/all-access/user/"
               f"{urllib.parse.quote(title.replace(' ', '_'), safe='')}/monthly/20150701/{end}")
        for item in get(url)["items"]:
            y, m = int(item["timestamp"][:4]), int(item["timestamp"][4:6])
            # the middle of the month as a fraction of a year, so that a profile can draw the months in order
            rows.append([cid, round(y + (m - 0.5) / 12, 3), f"{y}-{m:02d}", lang, title, item["views"]])
        time.sleep(0.3)
    write("datasets/wikipedia-cannabis-views.csv", ["country", "time", "month", "language", "article", "views"], rows)


TASKS = {"gbif": gbif, "openalex": openalex, "alcohol": alcohol, "governance": governance, "minwage": minwage,
         "corruption": corruption, "religion": religion, "gdp": gdp, "wikipedia": wikipedia, "development": development,
         "books": books, "trials": trials, "parties": parties, "news": news}
if len(sys.argv) != 2 or sys.argv[1] not in TASKS:
    sys.exit(f"usage: python3 scripts/fetch-open-data.py {'|'.join(TASKS)}")
TASKS[sys.argv[1]]()
