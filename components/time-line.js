import { getGist } from "../js/utils.js";

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
				this.timeline =
					JSON.parse(response.files["experience.json"].content).items || [];
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
			// Current role starts expanded so its details are visible without a click.
			const opened = index === 0 ? " opened" : "";
			return `
        <section class="time-line__item ${type}${opened}">
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
	import("../components/component-builder.js").then(function () {
		CreateComponent("time-line", Component);
	});
});
