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
			getGist(this.gist)
				.then((response) =>
					JSON.parse(response.files["experience.json"].content),
				)
				.then((response) => {
					this.timeline = response.items;
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
