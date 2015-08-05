JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['postsIndex'],

  tagName: "ul",

  initialize: function () {
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "reest", this.render);
  },

  render: function () {
    this.$el.html(this.template());

    var indexView = this;

    this.collection.each(function (post) {
      var view = new JournalApp.Views.PostsIndexItem({ model: post });
      indexView.$el.append(view.render().$el);
    });

    return this;
  },
});
