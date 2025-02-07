import { getLatestArticles } from "../js/utils.js";

window.addEventListener("WebComponentsReady", function () {
	var Component = {
		articles: [],
		err: null,
		connectedCallback() {
			console.log("articles loading");
			getLatestArticles()
				.then((response) => {
					this.articles = response;
					this.updateComponent();
				})
				.catch((err) => {
					this.err = err;
				});
		},
		render() {
			return `
			<section class="articles-outer">
                <section class="articles">
                    <header>
                        <h4>Latest articles on Medium</h4>
                    </header>
                    ${this.articles.map(this.article).join("")}
                </section>
            </section>
      `;
		},
		article(article = {}, _) {
			return `
			<section class="article">
                <header>
                    <h5><a href="${article.link}" target="_blank">${article.title}</a></h5>
                </header>
                <p class="publish-date"><span class="publish-tag">Published on:</span> ${article.pubDate.split(" ")[0]}</p>
            </section>
            `;
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("latest-articles", Component);
	});
});
