NewsReader.Views.FeedShow = Backbone.View.extend({
  template: JST['feed_show'],

  events: {
    "click .refresh": "reloadFeed"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },

  reloadFeed: function () {
    this.model.fetch({
      success: this.render.bind(this)
    });
  }
});
