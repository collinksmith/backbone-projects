JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['postsIndexItem'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({ post: this.model }));

    return this;
  }
});
