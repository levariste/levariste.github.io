import glob
import json
import os
import re


def build_language(language_file, prefix=None):
    language = language_file.replace('\\', '/').split('/')[1].split('.')[0]
    if prefix is None:
        prefix = language[:2]
    with open(language_file, encoding='UTF8') as f:
        data = json.load(f)

    for file in glob.glob('_*.html'):
        with open(file, 'r', encoding='UTF8') as f:
            template = f.read()
        file = file.replace('_', '')

        key_re = r'\{\{[^\}]+\}\}'
        for key in re.findall(key_re, template):
            keys = key[2:-2].split('.')
            d = data
            for k in keys:
                d = d[k]
            if type(d) is list:
                d = '\n'.join(d)
            template = template.replace(key, d)

        try:
            os.mkdir(prefix)
        except FileExistsError:
            pass
        with open(f'{prefix}/{file}', 'w', encoding='UTF8') as f:
            f.write(template)

for file in glob.glob('languages/*.json'):
    print(file)
    build_language(file)
