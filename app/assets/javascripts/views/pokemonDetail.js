Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemonDetail'],

  events: {
    "click li.toy-list-item": "selectToyFromList"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.toys = new Pokedex.Collections.Toys();
  },

  render: function () {
    var content = this.template({pokemon: this.model});
    this.$el.html(content);

    this.model.toys().each(function (toy) {
      var content = JST['toyListItem']({ toy: toy });
      this.$el.append(content);
    }.bind(this));
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('toy-id');
    var toy = this.model.toys().get(toyId);
    debugger;
    var toyDetailView = new Pokedex.Views.ToyDetail({model: toy});
    $("#pokedex .toy-detail").html(toyDetailView.$el);
    toyDetailView.render();
  }
});
