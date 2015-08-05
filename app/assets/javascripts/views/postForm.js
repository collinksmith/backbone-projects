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
    if (this.errors) {
      this.$el.append(this.errors);
      this.errrors = undefined;
    }
    return this;
  },

  submitPost: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate("#posts/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (model, response) {
        var responseEl = $('<p>').append(response.responseText);
        this.errors = responseEl;
        this.model.fetch();
      }.bind(this),
      patch: true
    });
  }
});
