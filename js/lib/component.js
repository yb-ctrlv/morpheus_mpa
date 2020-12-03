define(function(require) {
    var Store = require('store');
    var Component = function Component(props) {
        var _props = props || {};
        var self = this;

        // We're setting a render function as the one set by whatever inherits this base
        // class or setting it to an empty by default. This is so nothing breaks if someone
        // forgets to set it.
        this.render = _props.render || function() {};

        // If there's a store passed in, subscribe to the state change
        if(_props.store instanceof Store)  {
            this.store = _props.store;
            _props.store.events.subscribe('stateChange', function () { self.render() });
        }

        // Store the HTML element to attach the render to if set
        if(_props.hasOwnProperty('element')) {
            this.element = _props.element;
        }
    };
    /** Extend Method */
    // Component.prototype.myMethod = function () {};
    return Component;
});