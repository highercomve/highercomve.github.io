import { encodeJSON, get, getGist } from "../js/utils.js";
import "./me-intro.js";
import "./me-outro.js";
import "./content-section.js";
import "./time-line.js";
import "./articles.js";

// Static CV content kept in the repo (not in the gist) so the downloaded
// CV / print view matches the full written resume.
var CV_SKILLS = [
	"Golang",
	"Docker",
	"Kubernetes",
	"Javascript",
	"React",
	"Vue.js",
	"State management libraries",
	"Web Components",
	"Ruby",
	"Amazon Web Services",
	"HTML / CSS",
	"Node.js",
	"MySQL",
	"MongoDB",
	"PostgreSQL",
	"Linux",
	"Bash",
	"Apache",
	"Nginx",
	"Git",
	"Front-end automation tools",
];

var CV_EDUCATION = [
	"<strong>Telecommunications Engineer</strong>",
	"Universidad Cat&oacute;lica Andr&eacute;s Bello &mdash; 2009",
];

var CV_LANGUAGES = [
	"<strong>English</strong>: written (advanced), verbal (advanced)",
	"<strong>Spanish</strong>: native",
];

var CV_TALKS = [
	"<strong>Noders JS</strong> &mdash; Santiago, Chile (January 2019). React Hooks.",
	'<strong>La Plata JS</strong> &mdash; La Plata, Argentina (December 2018). The current state of web components in the browser and how we can use them today. <a href="http://slides.com/highercomve/web-components" target="_blank" rel="noopener">slides</a>',
];

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
			getGist(this.gist)
				.then((response) => {
					this.html_url = response.html_url;
					return JSON.parse(response.files["content.json"].content);
				})
				.then((response) => {
					this.content = response;
					this.updateComponent();
				});
		},
		render() {
			var networks = encodeJSON(get(this, "content.networks", []));
			var aboutMeContent = encodeJSON(
				get(this, "content.about_me.content", []),
			);
			var aimsContent = encodeJSON(get(this, "content.aims.content", []));
			var skills = encodeJSON(CV_SKILLS);
			var education = encodeJSON(CV_EDUCATION);
			var languages = encodeJSON(CV_LANGUAGES);
			var talks = encodeJSON(CV_TALKS);
			return `
        <section class="site">
			<header>
				<me-intro name="${get(this, "content.name")}" tagline="${get(this, "content.tagline")}" networks="${networks}"></me-intro>
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
