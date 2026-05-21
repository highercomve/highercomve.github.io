(function (window) {
  'use strict';
  var TEXT_NODE = 3
  var ELEMENT_NODE = 1
  var DOCUMENT_FRAGMENT_NODE = 11
  var defaultTemplate = `
    <style>
      :host {
        display: block;
        contain: content; /* CSS containment FTW. */
      }
    </style>
    <slot></slot>
  `

  function consoleThis () {
    console.log(...arguments)
  }
  
  function updateAttributes (newNode, oldNode) {
    if (newNode.nodeType !== ELEMENT_NODE || oldNode.nodeType !== ELEMENT_NODE) {
      return
    }
    var newAttrs = newNode.getAttributeNames()
    var oldAttrs = oldNode.getAttributeNames()
    var newSet = new Set(newAttrs)
    for (var i = 0; i < newAttrs.length; i++) {
      var name = newAttrs[i]
      var value = newNode.getAttribute(name)
      if (oldNode.getAttribute(name) !== value) {
        oldNode.setAttribute(name, value)
      }
    }
    for (var j = 0; j < oldAttrs.length; j++) {
      if (!newSet.has(oldAttrs[j])) {
        oldNode.removeAttribute(oldAttrs[j])
      }
    }
  }

  function changed (node1, node2) {
    return typeof node1 !== typeof node2 ||
      typeof node1 === 'string' && node1 !== node2 ||
      node1.nodeType === TEXT_NODE && node1.textContent !== node2.textContent ||
      node1.nodeType !== node2.nodeType
  }

  function emptyTextNode (node) {
    return node && node.nodeType === TEXT_NODE && node.nodeValue.trim() === ''
  }

  function isTypeOfComponentBuilder (node) {
    return node && node.localName && node.localName.split('-').length > 1
  }

  function updateElement ($parent, newNode, oldNode) {
    var notUpdate = (!oldNode && !newNode)
                      || (emptyTextNode(newNode) && emptyTextNode(oldNode))
    if (notUpdate) {
      return
    }
    if (!oldNode) {
      $parent.appendChild(newNode)
      return
    }
    if (!newNode) {
      $parent.removeChild(oldNode)
      return
    }
    if (isTypeOfComponentBuilder(newNode) && isTypeOfComponentBuilder(oldNode)) {
      updateAttributes(newNode, oldNode)
      return
    }
    if (changed(newNode, oldNode)) {
      $parent.replaceChild(newNode, oldNode)
      return
    }
    updateAttributes(newNode, oldNode)
    var newChildren = [].slice.call(newNode.childNodes)
    var oldChildren = [].slice.call(oldNode.childNodes)
    var max = Math.max(newChildren.length, oldChildren.length)
    for (var i = 0; i < max; i++) {
      updateElement(oldNode, newChildren[i], oldChildren[i])
    }
  }

  function clone (obj, list = [], include = true) {
    return Object.keys(obj).reduce((result, key) => {
      if (list.includes(key) === include) {
        result[key] = obj[key]
      }
      return result
    }, {})
  }

  function setEvents (events) {
    this.listeners = []
    Object.keys(events || {}).forEach((key) => {
      var type = key.split(/ (.+)/)[0]
      var selector = key.split(/ (.+)/)[1]
      var cb = events[key]
      var handler = function (event) {
        var isChildrenOf = [...this.querySelectorAll(selector)].some((element) => {
          return element.contains(event.target)
        })
        if (event.target && (isChildrenOf || event.target.matches(selector))) {
          cb.call(this, event)
        }
      }.bind(this)
      this.listeners.push({ type, handler })
      this.addEventListener(type, handler)
    })
  }

  function unSetEvents () {
    this.listeners.forEach((listener) => {
      this.removeEventListener(listener.type, listener.handler)
    })
    this.listeners = []
  }

  function mountedWrapper (options) {
    return function onMounted () {
      updateComponent.call(this)
      setEvents.call(this, options.events)
      return options.connectedCallback
        ? options.connectedCallback.call(this)
        : consoleThis.call(this)
    }
  }

  function updateComponent () {
    if (!this.render) {
      return
    }
    var renderTxt = this.render(this).replace(/[\n\r]+/g, '')
    this.renderTemplate.innerHTML = `<div>${renderTxt}</div>`
    var container = this
    var newContent = this.renderTemplate.content.cloneNode(true).children[0]
    var lastContent = container.children[0]
    if (!lastContent || newContent.innerHTML !== lastContent.innerHTML) {
      updateElement(container, newContent, lastContent)
    }
  }

  function onChange (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      updateComponent.call(this)
    }
  }

  function disconnectedWrapper (cb) {
    return function disconnectedCallback () {
      unSetEvents.call(this)
      if (cb) {
        cb.call(this)
      }
    }
  }

  function isRequired (message) {
    throw new Error(message)
  }

  window.CreateComponent = function (name = isRequired('name is required'), options = {}) {
    var elemMethods = clone(
      options,
      [
        'onCreated',
        'connectedCallback',
        'adoptedCallback',
        'attributeChangedCallback',
        'disconnectedCallback',
        'observedAttributes',
        'events'
      ],
      false
    )

    function Component() {
      var _ = Reflect.construct(HTMLElement, [], new.target)
      _.renderTemplate = document.createElement('template')
      _.attachShadow({mode: 'open'})
      if (options.template && options.template.nodeType) {
        _.shadowRoot.appendChild(options.template.content.cloneNode(true))
      } else {
        _.shadowRoot.innerHTML = (options.template || defaultTemplate).replace(/[\n\r]+/g, '')
      }
      _.onCreated.call(_)
      _.updateComponent.call(_)
      return _
    }

    Component.prototype = Object.create(HTMLElement.prototype, {
      constructor: { value: Component, enumerable: false, writable: true, configurable: true }
    })
    Component.prototype.render = options.render
    Component.prototype.connectedCallback = mountedWrapper(options)
    Component.prototype.disconnectedCallback = disconnectedWrapper(options.disconnectedCallback || consoleThis.bind(null, 'disconnectedCallback'))
    Component.prototype.attributeChangedCallback = options.attributeChangedCallback || onChange || consoleThis.bind(null, 'onChange')
    Component.prototype.adoptedCallback = options.adoptedCallback || consoleThis.bind(null, 'adoptedCallback')
    Component.prototype.onCreated = options.onCreated || consoleThis.bind(null, 'onCreated')
    Component.prototype.updateComponent = updateComponent
    Component.prototype.onChange = onChange
    Component.prototype.cbName = name

    Object.keys(elemMethods).forEach((key) => {
      var descriptorKeys = ['configurable', 'enumerable', 'value', 'writable', 'get', 'set']
      var isDescriptor = elemMethods[key] &&
                            typeof elemMethods[key] === 'object' &&
                            Object.keys(elemMethods[key]).some((key) => descriptorKeys.includes(key))
      if (isDescriptor) {
        Object.defineProperty(Component.prototype, key, elemMethods[key])
      } else {
        Component.prototype[key] = elemMethods[key]
      }
    })
    if (options.observedAttributes) {
      Object.defineProperty(Component, 'observedAttributes', {
        configurable: true,
        get: options.observedAttributes
      })
    }

    customElements.define(name, Component);
    return Component;
  }
})(window)
