window.addEventListener("WebComponentsReady", function () {
	var Component = {
		name: {
			get() {
				return this.getAttribute("name");
			},
		},
		url: {
			get() {
				return this.getAttribute("url");
			},
		},
		year: new Date().getFullYear(),
		observedAttributes() {
			return ["name", "url"];
		},
		render() {
			return `
        <section class="me-outro">
          <div>
            <p>
              This site was build using vanilla JS web components without any dependency
              and using github <a href="${this.url}" target="_blank">gist</a> to store the data as json objects
            </p>
            <p>
              You can see the source code of this project on <a href="https://github.com/highercomve/highercomve.github.io/tree/development" target="_blank">Github</a>
            </p>
            <p>${this.name} - ${this.year}</p>
          </div>
        </section>
      `;
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("me-outro", Component);
	});
});
