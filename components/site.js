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
			var skills = encodeJSON(get(this, "content.skils.content", []));
			var education = encodeJSON(get(this, "content.education.content", []));
			var languages = encodeJSON(get(this, "content.languages.content", []));
			var talks = encodeJSON(get(this, "content.talks.content", []));
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
				<content-section title="Technical skills" wrapper="li" content="${skills}"></content-section>
			</section>
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
