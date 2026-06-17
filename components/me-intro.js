import { encodeJSON, decodeJSON } from "../js/utils.js";
import "./network.js";

window.addEventListener("WebComponentsReady", function () {
	var AboutMe = {
		name: {
			get() {
				return this.getAttribute("name") || "loading...";
			},
		},
		networks: {
			get() {
				return decodeJSON(this.getAttribute("networks"), "[]");
			},
		},
		tagline: {
			get() {
				return this.getAttribute("tagline") || "loading...";
			},
		},
		observedAttributes() {
			return ["name", "tagline", "networks"];
		},
		render() {
			return `
        <section class="me-intro">
          <section class="picture">
            <img src="https://avatars3.githubusercontent.com/u/1034621?s=460&v=4">
          </section>
          <section class="content">
            <h1>${this.name}</h1>
            <h3>${this.tagline}</h3>
            <section class="networks">
              ${this.networks
					.map((network) => {
						return `<network-link network="${encodeJSON(network)}"></network-link>`;
					})
					.join("")}
              <section class="network-link print-cv-icon">
                <a href="#" role="button" title="Download CV as PDF" aria-label="Download CV as PDF">
                  <i class="fas fa-file-pdf"></i>
                </a>
              </section>
            </section>
          </section>
        </section>
      `;
		},
		events: {
			"click .print-cv-icon": function (event) {
				event.preventDefault();
				window.print();
			},
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("me-intro", AboutMe);
	});
});
