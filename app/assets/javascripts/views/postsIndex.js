JournalApp.Views.PostsIndex = Backbone.View.extend({
  tagName: "ul",

  initialize: function () {
    this.listenTo(this.collection, "change remove reset sync", this.render);
  },

  render: function () {
    this.$el.empty();
    var indexView = this;
    this.collection.each(function (post) {
      var view = new JournalApp.Views.PostsIndexItem({ model: post });
      indexView.$el.append(view.render().$el);
    });

    return this;
  },
});
