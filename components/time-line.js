import { getGist } from "../js/utils.js";

// The forEach developer entry in experience.json holds personal open-source
// projects, not employment: keep it out of the timeline and show it in its own
// card instead (mirrors cvrank's site.py _is_project, and build-cv.py).
function isProject(job = {}) {
	return (job.title || "").includes("forEach developer");
}

window.addEventListener("WebComponentsReady", function () {
	var Component = {
		timeline: [],
		gist: {
			get() {
				return this.getAttribute("gist");
			},
		},
		connectedCallback() {
			getGist(this.gist, (response) => {
				var items =
					JSON.parse(response.files["experience.json"].content).items || [];
				this.timeline = items.filter((job) => !isProject(job));
				this.updateComponent();
			});
		},
		render() {
			return `
        <section class="time-line">
          ${this.timeline.map(this.event).join("")}
        </section>
      `;
		},
		event(item = {}, index) {
			// The current role is a full-width card above the alternating
			// timeline, open by default so its details read without a click.
			const current = index === 0;
			const type = current ? "current opened" : index % 2 === 1 ? "odd" : "even";
			return `
        <section class="time-line__item ${type}">
          <span class="label">${item.label}</span>
          <i class="fas fa-angle-down"></i>
          <h1 class="title">${item.title}</h1>
          <h2 class="subtitle">${item.subtitle}</h2>
          <ul class="description">
            ${item.description.map((d) => `<li>${d}</li>`).join("")}
          </ul>
        </section>
      `;
		},
		events: {
			"click .time-line__item": function (event, element) {
				event.target
					.closest(".time-line__item")
					.classList.toggle("opened");
			},
		},
	};

	// Body of the full-width "projects" card in .cv-extras.
	var Projects = {
		projects: [],
		gist: {
			get() {
				return this.getAttribute("gist");
			},
		},
		connectedCallback() {
			getGist(this.gist, (response) => {
				var items =
					JSON.parse(response.files["experience.json"].content).items || [];
				this.projects = items.filter(isProject);
				this.updateComponent();
			});
		},
		render() {
			if (!this.projects.length) {
				return "";
			}
			return `
        <section class="content-section">
          <h1 class="content-section__title">Selected open-source projects</h1>
          <section class="content-section__content">
            <p class="projects__org"><strong>forEach developer</strong> — personal open-source</p>
            ${this.projects
							.map(
								(job) => `
              <p class="projects__meta"><em>${job.subtitle}</em></p>
              <ul class="projects__list">
                ${job.description.map((d) => `<li>${d}</li>`).join("")}
              </ul>`,
							)
							.join("")}
          </section>
        </section>
      `;
		},
	};

	import("../components/component-builder.js").then(function () {
		CreateComponent("time-line", Component);
		CreateComponent("open-source-projects", Projects);
	});
});
