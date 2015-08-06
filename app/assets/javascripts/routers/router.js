NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "feedsIndex",
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

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  },
});
