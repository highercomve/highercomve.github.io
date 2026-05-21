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
                        <p class="articles__eyebrow">From the blog</p>
                        <h4>Latest articles on Medium</h4>
                    </header>
                    <div class="articles__timeline">
                        ${this.articles.map(this.article).join("")}
                    </div>
                </section>
            </section>
      `;
		},
		article(article = {}, _) {
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = article.description;
			let plainTextDescription =
				tempDiv.textContent || tempDiv.innerText || "";
			plainTextDescription = plainTextDescription
				.replace(/Continue reading on [^\s]+ \u00bb/, "")
				.replace(/\s+/g, " ")
				.trim();

			const SUMMARY_LIMIT = 200;
			let summary = plainTextDescription;
			if (summary.length > SUMMARY_LIMIT) {
				const truncated = summary.slice(0, SUMMARY_LIMIT);
				const lastSpace = truncated.lastIndexOf(" ");
				summary =
					(lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) +
					"\u2026";
			}

			const formattedDate = (() => {
				const d = new Date(article.pubDate);
				if (Number.isNaN(d.getTime())) return article.pubDate.split(" ")[0];
				return d.toLocaleDateString(undefined, {
					year: "numeric",
					month: "short",
					day: "numeric",
				});
			})();

			const categories = article.categories
				.slice(0, 3)
				.map((category) => `<span class="category">${category}</span>`)
				.join("");

			return `
			<a class="article" href="${article.link}" target="_blank" rel="noopener noreferrer">
				<time class="article__date" datetime="${article.pubDate}">${formattedDate}</time>
				<h5 class="article__title">${article.title}</h5>
				<p class="article__summary">${summary}</p>
				<div class="article__footer">
					<div class="article__categories">${categories}</div>
					<span class="article__cta">Read more <span class="article__arrow" aria-hidden="true">\u2192</span></span>
				</div>
			</a>
			`;
		},
	};
	import("../components/component-builder.js").then(function () {
		CreateComponent("latest-articles", Component);
	});
});
