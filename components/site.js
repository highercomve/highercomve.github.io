import { encodeJSON, get, getGist } from "../js/utils.js";
import "./me-intro.js";
import "./me-outro.js";
import "./content-section.js";
import "./time-line.js";
import "./articles.js";

window.addEventListener("WebComponentsReady", function () {
	var Site = {
		html_url: null,
		content: {},
		gist: {
			get() {
				return this.getAttribute("gist");
			},
		},
		connectedCallback() {
			getGist(this.gist, (response) => {
				this.html_url = response.html_url;
				this.content = JSON.parse(response.files["content.json"].content);
				this.updateComponent();
			});
		},
		render() {
			var networks = encodeJSON(get(this, "content.networks", []));
			var aboutMeContent = encodeJSON(
				get(this, "content.about_me.content", []),
			);
			var aimsContent = encodeJSON(get(this, "content.aims.content", []));
			var competencies = encodeJSON(
				get(this, "content.competencies.content", []),
			);
			var skills = encodeJSON(get(this, "content.skils.content", []));
			var education = encodeJSON(get(this, "content.education.content", []));
			var languages = encodeJSON(get(this, "content.languages.content", []));
			var talks = encodeJSON(get(this, "content.talks.content", []));
			// Screen only: hidden in the printed CV.
			var foreach = encodeJSON([
				'<a class="foreach__brand" href="https://foreachdeveloper.com/" target="_blank" rel="noopener" aria-label="forEach developer">' +
					'<svg class="foreach__mark" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 13H9v38h8"/><path d="M47 13h8v38h-8"/></g><circle cx="21.5" cy="32" r="4.2"/><circle cx="32" cy="32" r="4.2"/><circle cx="42.5" cy="32" r="4.2"/></svg>' +
					"<span>forEach<b>.</b><i>developer</i></span></a>",
				"My one-person open-source studio: apps that run on your machine, AI included, with the source open.",
				"Projects include Oriel (desktop and mobile apps with a Zig backend and a web UI), GhostPen (offline AI writing, dictation and captions), GhostReel (local video search and editing) and HollerShare (Quick Share file transfer with Android).",
				'<a class="foreach__cta" href="https://foreachdeveloper.com/" target="_blank" rel="noopener">See the projects <span aria-hidden="true">→</span></a>',
			]);
			return `
        <section class="site">
			<header>
				<me-intro name="${get(this, "content.name")}" tagline="${get(this, "content.tagline")}" location="${get(this, "content.location")}" networks="${networks}"></me-intro>
			</header>
			<section class="resume">
				<content-section title="${get(this, "content.about_me.title")}" wrapper="${get(this, "content.about_me.wrapper")}" content="${aboutMeContent}"></content-section>
			</section>
			<section class="aims">
				<content-section title="${get(this, "content.aims.title")}" wrapper="${get(this, "content.aims.wrapper")}" content="${aimsContent}"></content-section>
			</section>
			<section class="cv-block skills">
				<content-section title="Core competencies" wrapper="li" content="${competencies}"></content-section>
				<content-section title="Technical skills" wrapper="li" content="${skills}"></content-section>
			</section>
			<div class="container experience-title-wrap">
				<h1 class="content-section__title experience-title">Professional Experience</h1>
			</div>
			<time-line gist="${this.gist}"></time-line>
			<section class="cv-extras">
				<section class="cv-block cv-card education">
					<content-section title="Education" wrapper="p" content="${education}"></content-section>
				</section>
				<section class="cv-block cv-card languages">
					<content-section title="Languages" wrapper="li" content="${languages}"></content-section>
				</section>
				<section class="cv-block cv-card talks">
					<content-section title="Talks" wrapper="li" content="${talks}"></content-section>
				</section>
				<section class="cv-block cv-card foreach">
					<content-section title="Side project" wrapper="p" content="${foreach}"></content-section>
				</section>
			</section>
			<latest-articles></latest-articles>
          	<me-outro name="${get(this, "content.name")}" url="${this.html_url}" ></me-outro>
        </section>
      `;
		},
	};

	import("../components/component-builder.js").then(function () {
		CreateComponent("web-site", Site);
	});
});
