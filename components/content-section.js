import { decodeJSON } from "../js/utils.js";

window.addEventListener("WebComponentsReady", function () {
	var Component = {
		content: {
			get() {
				return decodeJSON(this.getAttribute("content"), []);
			},
		},
		title: {
			get() {
				return this.getAttribute("title");
			},
		},
		wrapper: {
			get() {
				return this.getAttribute("wrapper") || "p";
			},
		},
		observedAttributes() {
			return ["title", "content", "wrapper"];
		},
		render() {
			return `
        <section class="content-section">
          <h1 class="content-section__title">${this.title}</h1>
          <section class="content-section__content">
            ${this.content.map((c) => `<${this.wrapper}>${c}</${this.wrapper}>`).join("")}
          </section>
        </section>
      `;
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("content-section", Component);
	});
});
