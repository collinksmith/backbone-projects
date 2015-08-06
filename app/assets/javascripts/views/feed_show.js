NewsReader.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['feed_show'],

  events: {
    "click .refresh": "reloadFeed"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.addEntriesView(this.model.entries());
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  reloadFeed: function () {
    this.model.fetch({
      success: this.render.bind(this)
    });
  },

  addEntriesView: function (entries) {
    var subview = new NewsReader.Views.EntriesIndex({ collection: entries });
    this.addSubview('.entries', subview);
  }

});
