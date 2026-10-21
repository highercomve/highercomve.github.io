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
					This site was built using vanilla JS web components without any dependency,
					with all content stored in a static <a href="/assets/data.json" target="_blank">JSON file</a>
				</p>
				<p>
					A plain-text version of this CV, for AI tools and applicant tracking systems, is at <a href="/cv.md" target="_blank">/cv.md</a>
				</p>
				<p>
					You can see the source code of this project on <a href="https://github.com/highercomve/highercomve.github.io" target="_blank">Github</a>
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
