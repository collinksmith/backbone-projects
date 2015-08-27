NewsReader.Views.EntryShow = Backbone.View.extend({
  template: JST['entry_show'],
  
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  }
});
