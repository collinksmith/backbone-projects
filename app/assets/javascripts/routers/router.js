NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feedsIndex",
    "feeds/new": "feedNew",
    "feeds/:id": "feedShow"
  },

  initialize: function (options) {
    this.collection = new NewsReader.Collections.Feeds();
    this.$rootEl = options.$rootEl;
  },

  feedsIndex: function () {
    this.collection.fetch();
    var view = new NewsReader.Views.FeedsIndex({ collection: this.collection });
    this.swap(view);
  },

  feedShow: function (id) {
    var feed = this.collection.getOrFetch(id);
    var view = new NewsReader.Views.FeedShow({ model: feed });
    this.swap(view);
  },

  feedNew: function () {
    var feed = new NewsReader.Models.Feed();
    var view = new NewsReader.Views.FeedForm({ model: feed,
                                               collection: this.collection });
    this.swap(view);
  },

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  },
});
