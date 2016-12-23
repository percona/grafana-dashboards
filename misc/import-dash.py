#!/usr/bin/env python

"""Grafana dashboard importer script."""

import json
import os
import requests

HOST = 'https://pmmdemo.percona.com/graph'
API_KEY = '***'

DIR = 'dashboards/'


def main():
    headers = {'Authorization': 'Bearer %s' % (API_KEY,), 'Content-Type': 'application/json'}

    for file in os.listdir(DIR):
        if not file.endswith('.json'):
            continue

        print file
        f = open(DIR + file, 'r')
        dash = json.load(f)
        f.close()

        data = {'dashboard': dash, 'overwrite': True}
        r = requests.post('%s/api/dashboards/db' % (HOST,), json=data, headers=headers)
        if r.status_code != 200:
            print r.status_code, r.content
            break


if __name__ == '__main__':
    main()
