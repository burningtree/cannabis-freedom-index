# Cannabis use rebuilt from UNODC World Drug Report 2026, table 1.2 (21 October 2026)

`datasets/unodc-cannabis-use.csv` was rebuilt by `python3 scripts/extract-unodc.py use` from
`datasets/unodc-wdr2026-1.2-prevalence-national.xlsx`, replacing figures taken from Wikipedia's
list of annual cannabis use. Users are now the share applied to the World Bank's population
aged 15–64 (SP.POP.1564.TO, latest year). Below: every country whose share or survey year changed.

- 124 countries now come from the UNODC table, 33 keep an earlier figure the table lacks, 62 are regional estimates (65 before).
- Where the table's latest survey is older than the year Wikipedia gave (Zambia, Madagascar, Belize), the table is followed: Wikipedia's years for these do not match any survey in the table.

## Measured figures that changed (70)

| Country | Before | Year | After | Survey | Age band | Users before | Users after |
|---|---|---|---|---|---|---|---|
| Nigeria | 19.4% | 2019 | 10.76% | 2017 | 15–64 | 26,000,000 | 14,000,000 |
| South Africa | 3.65% | 2011 | 11.22% | 2017 | 15–64 | 1,600,000 | 4,900,000 |
| Canada | 27% | 2022 | 32.4% | 2023 | 15+ | 7,300,000 | 8,700,000 |
| Zambia | 14.8% | 2019 | 9.5% | 2004 | 15–64 | 1,800,000 | 1,200,000 |
| Madagascar | 14.2% | 2019 | 9.1% | 2004 | 15–64 | 2,700,000 | 1,700,000 |
| United States | 21.9% | 2020 | 26.38% | 2023 | 15–64 | 48,000,000 | 58,000,000 |
| Bulgaria | 2.4% | 2020 | 6.7% | 2024 | 15–64 | 98,000 | 270,000 |
| Belize | 12.7% | 2019 | 8.45% | 2005 | 12–65 | 37,000 | 24,000 |
| Brazil | 2.81% | 2012 | 6% | 2023 | 14+ | 4,100,000 | 8,800,000 |
| Portugal | 5.1% | 2020 | 2.8% | 2022 | 15–64 | 340,000 | 190,000 |
| Uruguay | 14.6% | 2018 | 12.3% | 2024 | 15–64 | 330,000 | 270,000 |
| Argentina | 8.13% | 2017 | 10.3% | 2022 | 16–75 | 2,500,000 | 3,100,000 |
| Spain | 10.5% | 2020 | 12.6% | 2024 | 15–64 | 3,400,000 | 4,100,000 |
| Cyprus | 4% | 2020 | 6% | 2022 | 15–64 | 38,000 | 57,000 |
| Thailand | 1.33% | 2019 | 3.25% | 2024 | 12–65 | 660,000 | 1,600,000 |
| Poland | 3.8% | 2020 | 5.7% | 2023 | 15–64 | 900,000 | 1,300,000 |
| Germany | 7.1% | 2020 | 8.8% | 2021 | 18–64 | 3,700,000 | 4,600,000 |
| Czechia | 11.1% | 2020 | 9.4% | 2023 | 15–64 | 770,000 | 650,000 |
| Slovakia | 3.8% | 2020 | 5.4% | 2023 | 15–64 | 130,000 | 190,000 |
| Lithuania | 2.7% | 2020 | 4.3% | 2021 | 15–64 | 51,000 | 80,000 |
| Costa Rica | 5.18% | 2015 | 6.76% | 2022 | 15–64 | 180,000 | 240,000 |
| Switzerland | 9.09% | 2016 | 7.6% | 2022 | 15–64 | 530,000 | 450,000 |
| Chile | 12.05% | 2020 | 10.64% | 2024 | 15–64 | 1,600,000 | 1,500,000 |
| Egypt | 5.31% | 2016 | 3.9% | 2019 | 15–64 | 4,000,000 | 2,900,000 |
| Croatia | 10.2% | 2020 | 8.8% | 2023 | 15–64 | 250,000 | 210,000 |
| Hungary | 1.3% | 2020 | 2.6% | 2023 | 18–64 | 80,000 | 160,000 |
| Georgia | 3.4% | 2015 | 4.6% | 2022 | 18–64 | 85,000 | 120,000 |
| Jamaica | 18% | 2016 | 19.2% | 2023 | 15–64 | 370,000 | 400,000 |
| Netherlands | 10.1% | 2020 | 8.9% | 2024 | 15–64 | 1,200,000 | 1,000,000 |
| Romania | 3.5% | 2020 | 2.4% | 2024 | 15–64 | 430,000 | 290,000 |
| Bolivia | 2.19% | 2018 | 1.1% | 2023 | 12–65 | 180,000 | 90,000 |
| Estonia | 6.6% | 2020 | 5.6% | 2023 | 16–64 | 57,000 | 48,000 |
| New Zealand | 15% | 2020 | 14.1% | 2024/25 | 15+ | 520,000 | 480,000 |
| Kenya | 1.2% | 2016 | 2.1% | 2022 | 15–65 | 420,000 | 730,000 |
| Singapore | 0.004% | 2004 | 0.81% | 2021/22 | 15–65 | 180 | 37,000 |
| Finland | 8.2% | 2020 | 9% | 2022 | 15–64 | 280,000 | 310,000 |
| Italy | 10.2% | 2020 | 10.8% | 2022 | 18–64 | 3,800,000 | 4,000,000 |
| United Kingdom | 7.1% | 2020 | 6.5% | 2024 | 16–59 | 3,100,000 | 2,900,000 |
| Slovenia | 5.9% | 2020 | 5.4% | 2023 | 15–64 | 80,000 | 73,000 |
| Sweden | 3.8% | 2020 | 3.3% | 2024 | 16–64 | 250,000 | 220,000 |
| India | 3.2% | 2020 | 2.83% | 2018 | 10–75 | 32,000,000 | 28,000,000 |
| Ireland | 7.1% | 2020 | 7.4% | 2023 | 15–64 | 260,000 | 270,000 |
| Denmark | 6.3% | 2020 | 6.6% | 2023 | 16–64 | 240,000 | 250,000 |
| Malaysia | 1.6% | 2003 | 1.4% | 2020/21 | 15–64 | 410,000 | 360,000 |
| Serbia | 2% | 2018 | 2.2% | 2023 | 18–64 | 82,000 | 90,000 |
| Bangladesh | 3.3% | 2004 | 3.1% | 2018 | 7+ | 3,800,000 | 3,600,000 |
| France | 11% | 2020 | 10.8% | 2023 | 18–64 | 4,600,000 | 4,500,000 |
| Venezuela | 1.56% | 2011 | 1.41% | 2022 | 12–65 | 290,000 | 260,000 |
| Philippines | 1.64% | 2016 | 1.49% | 2019 | 15–64 | 1,300,000 | 1,200,000 |
| Japan | 0.1% | 2019 | 0.23% | 2023 | 15–64 | 72,000 | 170,000 |
| Lebanon | 1.9% | 2009 | 2% | 2009 | 15–64 | 71,000 | 75,000 |
| Australia | 11.6% | 2019 | 11.5% | 2022/23 | 14+ | 2,100,000 | 2,000,000 |
| Norway | 7% | 2024 | 6.9% | 2024 | 16–64 | 260,000 | 250,000 |
| Sri Lanka | 1.9% | 2018 | 1.98% | 2019 | 14+ | 270,000 | 280,000 |
| Algeria | 0.52% | 2010 | 0.59% | 2010 | 12+ | 160,000 | 180,000 |
| United Arab Emirates | 5.4% | 2006 | 5.35% | 2006 | 15–64 | 510,000 | 510,000 |
| Myanmar | 0.9% | 2005 | 0.94% | 2005 | 15–64 | 340,000 | 350,000 |
| Belarus | 1.1% | 2007 | 1.07% | 2007 | 15–64 | 66,000 | 64,000 |
| Nicaragua | 1.1% | 2006 | 1.07% | 2006 | 12–65 | 51,000 | 49,000 |
| Honduras | 0.8% | 2005 | 0.83% | 2005 | 12–65 | 57,000 | 60,000 |
| Laos | 0.9% | 2008 | 0.88% | 2008 | 15–64 | 46,000 | 45,000 |
| Fiji | 5.1% | 2004 | 5.08% | 2004 | 15–64 | 32,000 | 32,000 |
| Afghanistan | 3.81% | 2015 | 3.8% | 2015 | 15+ | 920,000 | 920,000 |
| South Korea | 0.3% | 2004 | 0.29% | 2004 | 15–64 | 110,000 | 100,000 |
| Türkiye | 1.1% | 2020 | 1.11% | 2018 | 15–64 | 650,000 | 650,000 |
| Russia | 3.5% | 2007 | 3.49% | 2007 | 15–64 | 3,300,000 | 3,300,000 |
| Belgium | 7% | 2020 | 7% | 2018 | 15–64 | 530,000 | 530,000 |
| Greece | 2.8% | 2020 | 2.8% | 2015 | 18–64 | 180,000 | 180,000 |
| Luxembourg | 5.4% | 2020 | 5.4% | 2019 | 15–64 | 25,000 | 25,000 |
| Malta | 0.9% | 2020 | 0.9% | 2013 | 15–64 | 3,500 | 3,500 |

## Estimates replaced by a survey (3)

| Country | Estimate before | After | Survey | Age band |
|---|---|---|---|---|
| Bermuda | 4.98% | 10.9% | 2009 | 16–65 |
| Macau | 1.9% | 0.26% | 2019-2021 | 12–92 |
| Puerto Rico | 4.98% | 4.88% | 2005 | 15–64 |

## Regional estimates that moved (62)

The medians are now taken over the new measured figures.

| Country | Before | After |
|---|---|---|
| Abkhazia | 1.9% | 2% |
| Aruba | 4.98% | 7.1% |
| Bahrain | 1.9% | 2% |
| Benin | 3.1% | 3.07% |
| Botswana | 3.1% | 3.07% |
| British Virgin Islands | 4.98% | 7.1% |
| Burundi | 3.1% | 3.07% |
| Cameroon | 3.1% | 3.07% |
| Cayman Islands | 4.98% | 7.1% |
| Central African Republic | 3.1% | 3.07% |
| Congo | 3.1% | 3.07% |
| Cuba | 6.1% | 7.1% |
| Curaçao | 4.98% | 7.1% |
| DR Congo | 3.1% | 3.07% |
| Djibouti | 3.1% | 3.07% |
| Equatorial Guinea | 3.1% | 3.07% |
| Eritrea | 3.1% | 3.07% |
| Eswatini | 3.1% | 3.07% |
| Faroe Islands | 5.7% | 5.75% |
| French Polynesia | 11.6% | 11.5% |
| Gabon | 3.1% | 3.07% |
| Gambia | 3.1% | 3.07% |
| Gibraltar | 5.7% | 5.75% |
| Guam | 10.25% | 11.5% |
| Guernsey | 5.7% | 5.75% |
| Guinea | 3.1% | 3.07% |
| Guinea-Bissau | 3.1% | 3.07% |
| Hong Kong | 1.9% | 2% |
| Iraq | 1.9% | 2% |
| Isle of Man | 5.7% | 5.75% |
| Jersey | 5.7% | 5.75% |
| Kiribati | 11.6% | 11.5% |
| Lesotho | 3.1% | 3.07% |
| Malawi | 3.1% | 3.07% |
| Mauritania | 3.1% | 3.07% |
| Micronesia | 11.6% | 11.5% |
| Mongolia | 1.9% | 2% |
| Mozambique | 3.1% | 3.07% |
| Nauru | 11.6% | 11.5% |
| Niger | 3.1% | 3.07% |
| North Korea | 1.9% | 2% |
| Northern Cyprus | 5.7% | 5.75% |
| Northern Mariana Islands | 10.25% | 11.5% |
| Palestine | 1.9% | 2% |
| Rwanda | 3.1% | 3.07% |
| Samoa | 11.6% | 11.5% |
| San Marino | 5.7% | 5.75% |
| Seychelles | 3.1% | 3.07% |
| Sint Maarten | 4.98% | 7.1% |
| Solomon Islands | 11.6% | 11.5% |
| Somaliland | 3.1% | 3.07% |
| South Sudan | 3.1% | 3.07% |
| Sudan | 3.1% | 3.07% |
| São Tomé and Príncipe | 3.1% | 3.07% |
| Timor-Leste | 1.9% | 2% |
| Tonga | 11.6% | 11.5% |
| Transnistria | 5.7% | 5.75% |
| Turkmenistan | 1.9% | 2% |
| Tuvalu | 11.6% | 11.5% |
| US Virgin Islands | 4.98% | 7.1% |
| Uganda | 3.1% | 3.07% |
| Yemen | 1.9% | 2% |

## Earlier figures kept, not in the UNODC table (33)

These still rest on Wikipedia's list and are marked as earlier figures on the site.

Andorra (14.6%, 2008), Angola (2.1%, 1999), Antigua and Barbuda (10.6%, 2005), Brunei (0.02%, 1996), Chad (0.9%, 1995), China (0.04%, 2015), Comoros (2.9%, 2002), Dominica (10.8%, 2006), Ethiopia (2.6%, 1999), Ghana (21.5%, 1998), Greenland (30%, 2018), Grenada (10.8%, 2005), Jordan (2.1%, 2001), Kyrgyzstan (6.4%, 2001), Libya (0.05%, 1998), Liechtenstein (8.6%, 2005), Mali (7.8%, 1995), Marshall Islands (5.5%, 2007), Namibia (3.9%, 2000), Oman (0.1%, 1999), Palau (24.2%, 2007), Papua New Guinea (29.5%, 1995), Qatar (0.1%, 1996), Saint Kitts and Nevis (11.7%, 2006), Saint Vincent and the Grenadines (7.1%, 2006), Senegal (2.8%, 1999), Somalia (2.5%, 2002), Syria (2%, 2002), Tajikistan (3.4%, 1998), Tanzania (0.2%, 1999), Vanuatu (0.1%, 1997), Vietnam (0.3%, 2002), Zimbabwe (6.9%, 2000)
