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
  
  function updateAttributes (node1, node2) {
    if (node1.nodeType !== ELEMENT_NODE || node1.nodeType !== ELEMENT_NODE) {
      return
    }
    var node1Attributes = node1.getAttributeNames().sort()
    var node2Attributes = node2.getAttributeNames().sort()
    var newLength = node1Attributes.length
    var oldLength = node2Attributes.length
    for (var i = 0; i < newLength || i < oldLength; i++) {
      var attr1Name = node1Attributes[i]
      var attr2Name = node2Attributes[i]
      if (!attr2Name || attr1Name === attr1Name) {
        node2.setAttribute(attr1Name, node1.getAttribute(attr1Name))
      }
      if (!attr1Name) {
        node2.removeAttribute(attr2Name)
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

  function updateElement ($parent, newNode, oldNode, index = 0) {
    var notUpdate = (!oldNode && !newNode) 
                      || (emptyTextNode(newNode) && emptyTextNode(oldNode)) 
    if (notUpdate) {
      return
    }
    if (!oldNode) {
      $parent.appendChild(
        newNode
      );
      return
    }
    if (!newNode) {
      $parent.removeChild(
        $parent.childNodes[index]
      );
      return
    }
    if (isTypeOfComponentBuilder(newNode) && isTypeOfComponentBuilder(oldNode)) {
      updateAttributes(newNode, oldNode)
      return
    }
    if (changed(newNode, oldNode)) {
      $parent.replaceChild(
        newNode,
        $parent.childNodes[index]
      );
      return
    }
    if (newNode) {
      var newLength = newNode.childNodes.length;
      var oldLength = oldNode.childNodes.length;
      updateAttributes(newNode, oldNode)
      var newChildren = [...newNode.childNodes]
      var oldChildren = [...oldNode.childNodes]
      for (var i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          newChildren[i],
          oldChildren[i],
          i
        );
      }
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
      var type = key.split(/\ (.+)/)[0]
      var selector = key.split(/\ (.+)/)[1]
      var cb = events[key]
      var eventFunction = function (event) {
        var isChildrenOf = [...this.querySelectorAll(selector)].some((element) => {
          return element.contains(event.target)
        })
        if (event.target && (isChildrenOf || event.target.matches(selector))) {
          cb.call(this, ...arguments)
        }
      }
      this.listeners.push({ type, eventFunction })
      this.addEventListener(type, eventFunction.bind(this))
    })
  }

  function unSetEvents () {
    this.listeners.forEach((listener) => {
      this.removeEventListener(listener.type, listener.eventFunction)
    })
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
