JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['postItem'],

  tagName: 'li',

  events: {
    "click .delete-post": "deletePost"
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));

    return this;
  },

  deletePost: function () {
    this.model.destroy();
    this.remove();
  }
});
