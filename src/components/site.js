'use strict';
import { encodeJSON, get } from '../utils'
import './me-intro'
import './me-outro'
import './content-section'
import './time-line'

window.addEventListener('WebComponentsReady', function() {
  var Site = {
    me: {},
    connectedCallback () {
      fetch('https://api.github.com/gists/31b012276a7bd488f55ca74324b9faf1')
        .then(response => response.json())
        .then(response => JSON.parse(response.files['highercomve.json'].content))
        .then(response => {
          this.me = response
          this.updateComponent()
        })
    },
    render () {
      var networks = encodeJSON(get(this, 'me.networks', []))
      var aboutMeContent = encodeJSON(get(this, 'me.about_me.content', []))
      var aimsContent = encodeJSON(get(this, 'me.aims.content', []))
      return `
        <section class="site">
          <header>
            <me-intro name="${get(this, 'me.name')}" tagline="${get(this, 'me.tagline')}" networks="${networks}"></me-intro>
          </header>
          <section class="resume">
            <content-section title="${get(this, 'me.about_me.title')}" wrapper="${get(this, 'me.about_me.wrapper')}" content="${aboutMeContent}"></content-section>
          </section>
          <section class="aims">
            <content-section title="${get(this, 'me.aims.title')}" wrapper="${get(this, 'me.aims.wrapper')}" content="${aimsContent}"></content-section>
          </section>
          <time-line></time-line>
          <me-outro></me-outro>
        </section>
      `
    }
  }

  import('../component-builder.js')
    .then(function () {
      CreateComponent('web-site', Site)
    })
})
