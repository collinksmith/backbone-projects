JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['postForm'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "submit .post-form": "submitPost"
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));

    return this;
  },

  submitPost: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function () {
        this.collection && this.collection.add(this.model);
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
