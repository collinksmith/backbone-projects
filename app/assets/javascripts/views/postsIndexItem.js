JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['postsIndexItem'],

  tagName: 'li',

  events: {
    "click .delete-post": "deletePost",
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));

    return this;
  },

  deletePost: function () {
    debugger;
    this.model.destroy();
    this.remove();
  }
});
