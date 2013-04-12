/**
 * Backbone.DotAttr v0.1.0
 *
 * Copyright (c) 2011-2013 Bruno Abrantes
 * Distributed under MIT License
 *
 * Documentation and full license available at:
 * http://github.com/inf0rmer/backbone-dotattr *
**/
_.extend(Backbone.Model.prototype, {
  get: function(key) {
    return _.reduce(key.split('.'), function(attr, key) {
      if (attr instanceof Backbone.Model) {
        return attr.attributes[key];
      }
      return attr[key];
    }, this.attributes);
  }
});