NewsReader.Views.FeedsIndexItem = Backbone.View.extend({
  template: JST['feeds_index_item'],

  events: {
    "click .delete-feed": "deleteFeed"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({feed: this.model});
    this.$el.html(content);
    return this;
  },

  deleteFeed: function () {
    this.model.destroy();
  }
});
