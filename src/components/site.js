'use strict';
import { encodeJSON, get } from '../utils'
import './me-intro'
import './me-outro'
import './content-section'
import './time-line'

window.addEventListener('WebComponentsReady', function() {
  var Site = {
    html_url: null,
    content: {},
    gist: {
      get () {
        return this.getAttribute('gist')
      }
    },
    connectedCallback () {
      fetch(`https://api.github.com/gists/${this.gist}`)
        .then(response => response.json())
        .then(response => {
          this.html_url = response.html_url
          return JSON.parse(response.files['content.json'].content)
        })
        .then(response => {
          this.content = response
          this.updateComponent()
        })
    },
    render () {
      var networks = encodeJSON(get(this, 'content.networks', []))
      var aboutMeContent = encodeJSON(get(this, 'content.about_me.content', []))
      var aimsContent = encodeJSON(get(this, 'content.aims.content', []))
      return `
        <section class="site">
          <header>
            <me-intro name="${get(this, 'content.name')}" tagline="${get(this, 'content.tagline')}" networks="${networks}"></me-intro>
          </header>
          <section class="resume">
            <content-section title="${get(this, 'content.about_me.title')}" wrapper="${get(this, 'content.about_me.wrapper')}" content="${aboutMeContent}"></content-section>
          </section>
          <section class="aims">
            <content-section title="${get(this, 'content.aims.title')}" wrapper="${get(this, 'content.aims.wrapper')}" content="${aimsContent}"></content-section>
          </section>
          <time-line gist="${this.gist}"></time-line>
          <me-outro name="${get(this, 'content.name')}" url="${this.html_url}" ></me-outro>
        </section>
      `
    }
  }

  import('../component-builder.js')
    .then(function () {
      CreateComponent('web-site', Site)
    })
})
