import { getGist } from "../js/utils.js";

// Teaching roles kept in the repo (not in the gist), appended after the
// experience pulled from the gist so the CV matches the full written resume.
var EXTRA_ITEMS = [
	{
		title: "Ruby Teacher - Escuelaweb",
		label: "2011 - 2015",
		subtitle: "escuelaweb.net - Ruby",
		description: [
			"Taught how to build web applications with Ruby — using the full power of Ruby on Rails, or building APIs with the flexibility of Sinatra.",
		],
	},
	{
		title: "HTML / CSS / JavaScript Teacher - Escuelaweb",
		label: "2009 - 2015",
		subtitle: "escuelaweb.net - HTML / CSS / JavaScript",
		description: [
			"Taught modern front-end development: Yeoman, Grunt, CSS preprocessors, HTML5, CSS3, JavaScript client frameworks (AngularJS), jQuery, and jQuery Mobile.",
		],
	},
];

window.addEventListener("WebComponentsReady", function () {
	var Component = {
		timeline: [],
		gist: {
			get() {
				return this.getAttribute("gist");
			},
		},
		connectedCallback() {
			getGist(this.gist)
				.then((response) =>
					JSON.parse(response.files["experience.json"].content),
				)
				.then((response) => {
					this.timeline = (response.items || []).concat(EXTRA_ITEMS);
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
			const type = index % 2 === 0 ? "odd" : "even";
			return `
        <section class="time-line__item ${type}">
          <span class="label">${item.label}</span>
          <i class="fas fa-angle-down"></i>
          <h1 class="title">${item.title}</h1>
          <h2 class="subtitle">${item.subtitle}</h2>
          <div class="description">
            ${item.description.map((d) => `<p>${d}</p>`).join("")}
          </div>
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
	import("../components/component-builder.js").then(function () {
		CreateComponent("time-line", Component);
	});
});
