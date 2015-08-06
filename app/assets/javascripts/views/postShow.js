JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['postShow'],

  events: {
    "click .delete-post": "deletePost",
    "dblclick p": "editInput",
    "blur p": "saveInput"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },

  deletePost: function () {
    this.model.destroy();
    this.remove();
    Backbone.history.navigate('');
  },

  editInput: function (e) {
    var p = $(e.currentTarget);
    var oldVal = p.html();
    var oldName = p.attr('name');

    if (p.attr('class') === 'input') {
      p.html($('<input>').val(oldVal).attr('class', 'form-control'));
    } else if (p.attr('class') === 'textarea') {
      p.html($('<textarea>').html(oldVal).attr('class', 'form-control'));
    }

    p.attr('name', oldName);
  },

  saveInput: function (e) {
    var p = $(e.currentTarget);
    var attrName = p.attr("name").toLowerCase();
    var attrValue;

    if (p.attr('class') === 'input') {
      attrValue = p.find('input').val();
    } else if (p.attr('class') === 'textarea') {
      attrValue = p.find('textarea').val();
    }

    var attribute = {};
    attribute[attrName] = attrValue;
    this.model.save(attribute, {
      success: function (model) {
        // debugger
        // this.collection.add(model);
        Backbone.history.navigate("#posts/", {trigger: true});
        Backbone.history.navigate("#posts/" + this.model.id, {trigger: true});
      }.bind(this),

      error: function (model, response) {
        this.model.id && this.render();
        var responseEl = $('<p>').append(response.responseText);
        this.$el.append(responseEl);
      }.bind(this),

      wait: true
    });
  }
});
