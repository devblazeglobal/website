"""One-off port tool: the approved HTML mock-up -> JSX, markup unchanged.
Kept in the repo so the port can be re-run against a newer mock-up."""
import re, sys, json, urllib.parse
from html.parser import HTMLParser

WA = 'https://wa.me/6598199108?text='
VOID = {'img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'col', 'wbr'}
RENAME = {'class': 'className', 'classname': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'autocomplete': 'autoComplete',
          'maxlength': 'maxLength', 'spellcheck': 'spellCheck', 'inputmode': 'inputMode', 'readonly': 'readOnly',
          'colspan': 'colSpan', 'rowspan': 'rowSpan', 'crossorigin': 'crossOrigin', 'srcset': 'srcSet',
          'novalidate': 'noValidate', 'viewbox': 'viewBox', 'preserveaspectratio': 'preserveAspectRatio',
          'xlink:href': 'href', 'xmlns:xlink': None, 'onsubmit': None, 'datetime': 'dateTime', 'enterkeyhint': 'enterKeyHint'}
ROUTES = {'home': '/', 'about': '/about-us', 'blog': '/blog', 'start-a-business-in-singapore': '/start-a-business-in-singapore',
          'financial-compliance-calendar': '/compliance-deadline-calculator', 'compliance-calendar': '/compliance-deadline-calculator',
          'accounting': '/services/accounting', 'corporate-secretarial': '/services/corporate-secretarial', 'services': '/services',
          'bookkeeping': '/services/accounting/bookkeeping', 'management-reports': '/services/accounting/management-reports',
          'financial-statements-xbrl': '/services/accounting/financial-statements-xbrl', 'gst': '/services/accounting/gst',
          'corporate-income-tax': '/services/accounting/corporate-income-tax', 'tax-advisory': '/services/accounting/tax-advisory',
          'startups': '/solutions/startups', 'smes': '/solutions/smes', 'large-companies': '/solutions/large-companies',
          'reviews': '/#reviews', 'credentials': '/#credentials', 'team': '/about-us#team', 'contact': '/contact'}
ASSETS = json.loads(open(__file__.replace('html2jsx.py', 'assets.json')).read())

def camel(a):
    if a.startswith(('data-', 'aria-')): return a
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), a)

def style_obj(v):
    parts = [p.strip() for p in v.split(';') if p.strip()]
    out = []
    for p in parts:
        k, val = p.split(':', 1)
        k = k.strip()
        key = k if k.startswith('--') else camel(k)
        out.append(f'{json.dumps(key) if key.startswith("--") else key}: {json.dumps(val.strip())}')
    return '{{' + ', '.join(out) + '}}'

class P(HTMLParser):
    def __init__(s): super().__init__(convert_charrefs=False); s.o = []; s.a = []
    def attrs(s, tag, attrs):
        res = []; d = dict(attrs)
        wa = d.pop('data-wa', None) if 'data-wa' in d else None
        for k, v in attrs:
            if k == 'data-wa': continue
            if k.startswith('x-'): continue
            nk = RENAME.get(k, camel(k)) if k in RENAME else camel(k)
            if nk is None: continue
            if v is None: res.append(nk); continue
            if k == 'style': res.append(f'style={style_obj(v)}'); continue
            if k == 'href' and tag == 'a' and v.startswith('#') and len(v) > 1:
                h = v[1:]
                if h == 'start': v = '#get-started'
                elif h in ROUTES: v = ROUTES[h]
            if k == 'href' and wa is not None: v = WA + urllib.parse.quote(wa)
            if k in ('src',) and v in ASSETS: v = ASSETS[v]
            if tag == 'input' and k == 'value': nk = 'defaultValue'
            if tag == 'input' and k == 'checked': res.append('defaultChecked'); continue
            if tag == 'img' and k in ('width', 'height') and v.isdigit(): res.append(f'{nk}={{{v}}}'); continue
            res.append(f'{nk}={json.dumps(v)}')
        return (' ' + ' '.join(res)) if res else ''
    def handle_starttag(s, tag, attrs):
        if tag == 'x-island':
            d = dict(attrs); s.o.append('{' + d['jsx'] + '}' if d['jsx'].startswith('/*') else d['jsx']); return
        if tag == 'a':
            href = dict(attrs).get('href') or ''
            internal = href.startswith('/') or (href.startswith('#') and len(href) > 1 and href[1:] in ROUTES)
            internal = internal and 'data-wa' not in dict(attrs)
            s.a.append('Link' if internal else 'a')
            if internal:
                s.o.append(f'<Link{s.attrs("a", attrs)}>'); return
        if tag == 'img':
            d = dict(attrs); extra = []
            if 'width' not in d: extra += [('width', '1200'), ('height', '1600' if d.get('src', '').startswith('IMG_W') else '600')]
            if d.get('loading') == 'lazy': attrs = [x for x in attrs if x[0] != 'loading']
            s.o.append(f'<Image{s.attrs("img", list(attrs) + extra)} />'); return
        s.o.append(f'<{tag}{s.attrs(tag, attrs)}' + (' />' if tag in VOID else '>'))
    def handle_startendtag(s, tag, attrs):
        if tag == 'x-island': s.handle_starttag(tag, attrs); return
        s.o.append(f'<{tag}{s.attrs(tag, attrs)} />')
    def handle_endtag(s, tag):
        if tag in VOID or tag == 'x-island': return
        if tag == 'a' and s.a: tag = s.a.pop()
        s.o.append(f'</{tag}>')
    def handle_data(s, d):
        s.o.append(d.replace('{', '&#123;').replace('}', '&#125;').replace("'", '&apos;'))
    def handle_entityref(s, n): s.o.append(f'&{n};')
    def handle_charref(s, n): s.o.append(f'&#{n};')
    def handle_comment(s, c): s.o.append('{/*' + c.replace('*/', '') + '*/}')

def convert(html):
    p = P(); p.feed(html); return ''.join(p.o)

if __name__ == '__main__':
    print(convert(open(sys.argv[1]).read()))
