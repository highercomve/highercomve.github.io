#!/usr/bin/env python3
"""Snapshot the latest Medium posts into assets/articles.json.

The site is static and browsers can't read the Medium feed directly (no CORS),
so run this after publishing a new post:   ./update-articles.py

Posts published through a publication (e.g. ITNEXT) only carry a one-line
snippet in the feed: edit their "description" in assets/articles.json by hand;
reruns keep the longer saved text.
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

FEED = "https://medium.com/feed/@highercomve"
OUT = Path(__file__).resolve().parent / "assets" / "articles.json"
LIMIT = 4
CONTENT = "{http://purl.org/rss/1.0/modules/content/}encoded"


def plain_text(markup):
    text = re.sub(r"<[^>]+>", " ", markup or "")
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def summary(item):
    # Own posts carry the full body; publication posts (e.g. ITNEXT) only a snippet.
    body = item.findtext(CONTENT)
    if body:
        return plain_text(body)
    snippet = re.search(r'class="medium-feed-snippet">(.*?)</p>', item.findtext("description", ""), re.S)
    return plain_text(snippet.group(1)) if snippet else ""


def main():
    req = urllib.request.Request(FEED, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        root = ET.fromstring(resp.read())

    items = []
    for item in root.iter("item"):
        items.append({
            "title": item.findtext("title", ""),
            "link": item.findtext("link", "").split("?")[0],
            "pubDate": item.findtext("pubDate", ""),
            # The page trims this to ~200 characters, so keep it short.
            "description": summary(item)[:400],
            "categories": [c.text for c in item.findall("category") if c.text],
        })
        if len(items) == LIMIT:
            break

    if not items:
        sys.exit("no posts found in the feed; leaving articles.json untouched")

    # Publication posts only give a short snippet in the feed; keep any longer
    # description already saved (e.g. written by hand) for the same post.
    if OUT.exists():
        saved = {i["link"]: i["description"] for i in json.loads(OUT.read_text())["items"]}
        for item in items:
            previous = saved.get(item["link"], "")
            if len(previous) > len(item["description"]):
                item["description"] = previous
    OUT.write_text(json.dumps({"items": items}, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {len(items)} posts to {OUT}")


if __name__ == "__main__":
    main()
