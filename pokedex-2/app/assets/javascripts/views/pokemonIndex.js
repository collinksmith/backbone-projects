Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addPokemonToList);
  },

  render: function () {
    this.$el.empty();

    this.collection.each(function (pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({ pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (callback) {
    this.collection.fetch({
      success: callback
    });
  },

  selectPokemonFromList: function (event) {
    var id = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/pokemon/' + id , { trigger: true} );
  }
});
