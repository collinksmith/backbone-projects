Pokedex.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon(callback);
    $('#pokedex .pokemon-list').html(this._pokemonIndex.$el);
    this._pokemonIndex.render();
  },

  pokemonDetail: function (id, callback) {
    if (this._pokemonIndex === undefined) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    } else {
      this._pokemon = this._pokemonIndex.collection.findWhere({id: parseInt(id)});
      this._pokemon.fetch( {success: callback} );
      var view = new Pokedex.Views.PokemonDetail( {model: this._pokemon});
      $("#pokedex .pokemon-detail").html(view.$el);
      view.render();
    }
  },

  toyDetail: function (pokemonId, toyId) {
    pokemonId = parseInt(pokemonId);
    toyId = parseInt(toyId);
    if (this._pokemon === undefined) {
      this.pokemonDetail(
        pokemonId, this.toyDetail.bind(this, pokemonId, toyId)
      );
    } else {
      var toy = this._pokemon.toys().get(toyId);
      var toyDetailView = new Pokedex.Views.ToyDetail({model: toy});
      $("#pokedex .toy-detail").html(toyDetailView.$el);
      toyDetailView.render();
    }
  }
});
