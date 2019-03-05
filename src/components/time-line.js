'use strict';

window.addEventListener('WebComponentsReady', function() {
  var Component = {
    timeline: [],
    connectedCallback () {
      fetch('https://api.github.com/gists/31b012276a7bd488f55ca74324b9faf1')
        .then(response => response.json())
        .then(response => JSON.parse(response.files['experience.json'].content))
        .then(response => {
          this.timeline = response.items
          this.updateComponent()
        })
    },
    render () {
      return `
        <section class="time-line">
          ${this.timeline.map(this.event).join('')}
        </section>
      `
    },
    event (item = {}, index) {
      const type = index % 2 === 0 ? 'odd' : 'even'
      return `
        <section class="time-line__item ${type}">
          <span class="label">${item.label}</span>
          <h1 class="title">${item.title}</h1>
          <h2 class="subtitle">${item.subtitle}</h2>
          <div class="description">
            ${item.description.map(d => `<p>${d}</p>`).join('')}
          </div>
        </section>
      `
    },
    events: {
      'click .time-line__item': function (event) {
        event.target.classList.toggle('opened')
      }
    }
  }
  import('../component-builder.js')
    .then(function () {
      CreateComponent('time-line', Component)
    })
})
