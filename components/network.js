import { decodeJSON } from "../js/utils.js";

window.addEventListener("WebComponentsReady", function () {
	var Component = {
		network: {
			get() {
				return decodeJSON(this.getAttribute("network"));
			},
		},
		render() {
			return `
        <section class="network-link">
          <a href="${this.network.url}" title="${this.network.title}" target="_blank">
            <i class="fab fa-${this.network.icon}"></i>
          </a>
        </section>
      `;
		},
		observedAttributes() {
			return ["network"];
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("network-link", Component);
	});
});
