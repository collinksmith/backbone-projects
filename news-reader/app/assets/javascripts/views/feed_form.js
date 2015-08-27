NewsReader.Views.FeedForm = Backbone.View.extend ({
  template: JST['feed_form'],

  events: {
    "submit .new-feed": "createFeed"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createFeed: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function(model) {
        this.collection.add(model);
        Backbone.history.navigate("#/feeds/" + model.id, {trigger: true});
      }.bind(this)
    });
  }

});
