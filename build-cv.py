#!/usr/bin/env python3
"""Render the CV in assets/data.json as static text for crawlers and LLMs.

The live page draws the CV with JS, which AI fetchers, sourcing bots and
most ATS link previews never run. Run this after editing assets/data.json:

    ./build-cv.py

It rewrites two things from that one source:
  - the static CV between the cv:start / cv:end markers in index.html, the
    first child of <web-site>, which the component replaces once JS runs
  - cv.md, a plain Markdown copy served at /cv.md
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "assets" / "data.json"
INDEX = ROOT / "index.html"
MARKDOWN = ROOT / "cv.md"
SITE = "https://highercomve.github.io/"
START, END = "<!-- cv:start -->", "<!-- cv:end -->"


def load():
    files = json.loads(DATA.read_text())["files"]
    content = json.loads(files["content.json"]["content"])
    jobs = json.loads(files["experience.json"]["content"])["items"]
    return content, jobs


def split_job(job):
    """'Senior Software Engineer - Pantacor' -> ('Senior ...', 'Pantacor')."""
    role, _, company = job["title"].rpartition(" - ")
    return role, company


def dates(job):
    return job["label"].replace(" - ", " – ")


def to_markdown(markup):
    """Inline HTML from data.json -> Markdown."""
    text = re.sub(r"</?strong>", "**", markup)
    text = re.sub(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', r"[\2](\1)", text)
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(text)


def contact_links(content):
    links = []
    for network in content["networks"]:
        url = network["url"]
        label = url.removeprefix("mailto:").removeprefix("https://").removeprefix("www.")
        links.append((url, label))
    return links


def render_html(content, jobs):
    esc = html.escape
    out = [
        '<main class="cv-static">',
        f'<h1>{esc(content["full_name"])} ({esc(content["name"])})</h1>',
        f'<p><strong>{esc(content["tagline"])}</strong></p>',
        f'<p>{esc(content["location"])}</p>',
        "<p>"
        + " · ".join(f'<a href="{esc(url)}">{esc(label)}</a>' for url, label in contact_links(content))
        + ' · <a href="/cv.md">Plain-text CV</a></p>',
    ]

    def section(key, title=None):
        block = content[key]
        out.append(f'<h2>{esc(title or block["title"])}</h2>')
        if block["wrapper"] == "li":
            out.append("<ul>" + "".join(f"<li>{item}</li>" for item in block["content"]) + "</ul>")
        else:
            out.extend(f"<p>{item}</p>" for item in block["content"])

    section("about_me")
    section("aims")
    section("competencies", "Core Competencies")
    out.append("<h2>Technical Skills</h2>")
    out.append(f'<p>{esc(", ".join(content["skils"]["content"]))}</p>')
    out.append("<h2>Professional Experience</h2>")
    for job in jobs:
        role, company = split_job(job)
        out.append(f"<h3>{esc(role)} — {esc(company)}</h3>")
        out.append(f'<p>{esc(dates(job))} · {esc(job["subtitle"])}</p>')
        out.append("<ul>" + "".join(f"<li>{esc(d)}</li>" for d in job["description"]) + "</ul>")
    section("education")
    section("languages")
    section("talks")
    out.append("</main>")
    return "\n".join(out)


def render_markdown(content, jobs):
    out = [
        f'# {content["full_name"]} ({content["name"]})',
        "",
        f'**{content["tagline"]}**',
        "",
        content["location"],
        "",
        " · ".join(label for _, label in contact_links(content)),
        "",
        f"Web version: {SITE}",
    ]

    def section(key, title=None):
        block = content[key]
        out.extend(["", f'## {title or block["title"]}', ""])
        if block["wrapper"] == "li":
            out.extend(f"- {to_markdown(item)}" for item in block["content"])
        else:
            out.append("\n\n".join(to_markdown(item) for item in block["content"]))

    section("about_me")
    section("aims")
    section("competencies", "Core Competencies")
    out.extend(["", "## Technical Skills", "", ", ".join(content["skils"]["content"])])
    out.extend(["", "## Professional Experience"])
    for job in jobs:
        role, company = split_job(job)
        out.extend(["", f"### {role} — {company}", "", f'{dates(job)} · {job["subtitle"]}', ""])
        out.extend(f"- {d}" for d in job["description"])
    section("education")
    section("languages")
    section("talks")
    return "\n".join(out) + "\n"


def main():
    content, jobs = load()

    page = INDEX.read_text()
    before, found, rest = page.partition(START)
    _, found_end, after = rest.partition(END)
    if not (found and found_end):
        raise SystemExit(f"index.html is missing the {START} / {END} markers")
    INDEX.write_text(before + START + "\n" + render_html(content, jobs) + "\n" + END + after)

    MARKDOWN.write_text(render_markdown(content, jobs))
    print(f"updated {INDEX.name} and {MARKDOWN.name}")


if __name__ == "__main__":
    main()
