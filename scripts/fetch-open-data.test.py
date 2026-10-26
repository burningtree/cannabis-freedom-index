"""Regression checks for ClinicalTrials.gov start semantics (issue #188)."""
import datetime
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse

spec = importlib.util.spec_from_file_location('fetch_open_data', Path(__file__).with_name('fetch-open-data.py'))
data = importlib.util.module_from_spec(spec)
spec.loader.exec_module(data)
AS_OF = datetime.date(2026, 10, 22)


def status(date, kind='ACTUAL', overall='RECRUITING'):
    return {'startDateStruct': {'date': date, 'type': kind}, 'overallStatus': overall}


def study(nct, date, kind='ACTUAL', overall='RECRUITING', countries=('United States',)):
    return {'protocolSection': {'identificationModule': {'nctId': nct},
                               'statusModule': status(date, kind, overall),
                               'contactsLocationsModule': {'locations': [{'country': c} for c in countries]}}}


class ActualStartTests(unittest.TestCase):
    def test_future_and_estimated_starts_are_not_started(self):
        for record in [status('2026-11-01', 'ESTIMATED', 'NOT_YET_RECRUITING'),
                       status('2026-11-01'), status('2027-01-01'), status('2026-01-01', 'ESTIMATED'),
                       status('2026-01-01', overall='NOT_YET_RECRUITING'),
                       status('2026-01-01', overall='WITHDRAWN'),
                       {'startDateStruct': {'date': '2026-01-01'}}]:
            with self.subTest(record=record):
                self.assertIsNone(data.actual_start_year(record, AS_OF))

    def test_actual_start_cutoff_inclusive_and_partial_dates_conservative(self):
        self.assertEqual(data.actual_start_year(status('2026-10-22'), AS_OF), 2026)
        self.assertIsNone(data.actual_start_year(status('2026-10-23'), AS_OF))
        self.assertEqual(data.actual_start_year(status('2026-09'), AS_OF), 2026)
        self.assertIsNone(data.actual_start_year(status('2026-10'), AS_OF))
        self.assertEqual(data.actual_start_year(status('2025'), AS_OF), 2025)
        self.assertIsNone(data.actual_start_year(status('2026'), AS_OF))
        for date in ['', '2026-13', '2026-02-30', 'unknown']:
            self.assertIsNone(data.actual_start_year(status(date), AS_OF))

    def test_deduplication_cumulative_counts_and_zero_years(self):
        actual = study('NCT00000001', '2024-01-01', countries=('United States', 'United States', 'Canada'))
        rows, missed = data.trial_rows([actual, actual, study('NCT00000002', '2026-01-01'),
                                       study('NCT07694466', '2026-11-01', 'ESTIMATED', 'NOT_YET_RECRUITING')],
                                      {'United States': 'us', 'Canada': 'ca'}, AS_OF)
        self.assertEqual(missed, set())
        self.assertEqual([r for r in rows if r[0] == 'us'],
                         [['us', 2024, 1, 1, '2026-10-22'], ['us', 2025, 0, 1, '2026-10-22'],
                          ['us', 2026, 1, 2, '2026-10-22']])
        self.assertEqual([r[-2] for r in rows if r[0] == 'ca'], [1, 1, 1])

    def test_api_requests_start_type_and_consumes_all_pages(self):
        pages = [{'studies': [study('NCT00000001', '2025-01-01')], 'nextPageToken': 'page2'},
                 {'studies': [study('NCT00000002', '2026-11-01', 'ESTIMATED')]}]
        with patch.object(data, 'get', side_effect=pages) as get, patch.object(data, 'write') as write, \
             patch.object(data.glob, 'glob', return_value=[]), \
             patch.dict(data.TRIAL_NAMES, {'United States': 'us'}, clear=True), \
             patch.dict(data.os.environ, {'TRIALS_SNAPSHOT': ''}):
            data.trials(AS_OF)
        self.assertEqual(get.call_count, 2)
        for call in get.call_args_list:
            fields = parse_qs(urlparse(call.args[0]).query)['fields'][0]
            self.assertIn('StartDateType', fields)
            self.assertIn('OverallStatus', fields)
        self.assertEqual(parse_qs(urlparse(get.call_args_list[1].args[0]).query)['pageToken'], ['page2'])
        self.assertEqual(write.call_args.args[1], ['country', 'year', 'trials', 'to_date', 'as_of'])
        self.assertEqual(write.call_args.args[2][-1], ['us', 2026, 0, 1, '2026-10-22'])


if __name__ == '__main__':
    unittest.main()
