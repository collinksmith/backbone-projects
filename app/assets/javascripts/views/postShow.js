JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['postShow'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  }
});
