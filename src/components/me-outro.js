'use strict';

window.addEventListener('WebComponentsReady', function() {
  var Component = {
    render () {
      return `
        <section class="me-outro">
          <div>
            <p>Sergio Marin - 2019</p>
            <p>
              This site was build using web components and 
              <a href="https://gist.github.com/highercomve/31b012276a7bd488f55ca74324b9faf1" target="_blank">
                github gits as json storage
              </a>
            </p>
          </div>
        </section>
      `
    }
  }
  import('../component-builder.js')
    .then(function () {
      CreateComponent('me-outro', Component)
    })
})
