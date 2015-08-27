Pokedex.Views.ToyDetail = Backbone.View.extend({
  template: JST['toyDetail'],

  render: function () {
    var content = this.template({toy: this.model, pokes: _([])});
    this.$el.html(content);
  }
});
