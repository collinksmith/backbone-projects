JournalApp.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "postsIndex",
    "posts/new": "newPost",
    "posts/:id": "postShow",
    "posts/:id/edit": "postForm"
  },

  initialize: function (options) {
    this.collection = new JournalApp.Collections.Posts();
    this.collection.fetch({ reset: true });
    this.$rootEl = options.$rootEl;
  },

  postsIndex: function () {
    var view = new JournalApp.Views.PostsIndex({ collection: this.collection });
    this.swap(view);
  },

  postShow: function (id) {
    var post = this.collection.getOrFetch(id);
    var view = new JournalApp.Views.PostShow({ model: post });
    this.swap(view);
  },

  postForm: function (id) {
    var post = this.collection.getOrFetch(id);
    var view = new JournalApp.Views.PostForm({ model: post });
    this.swap(view);
  },

  newPost: function () {
    var post = new JournalApp.Models.Post();
    var view = new JournalApp.Views.PostForm({
      model: post,
      collection: this.collection
    });
    this.swap(view);
  },

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
