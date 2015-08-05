Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemonForm'],

  events: {
    "submit form.new-pokemon": "savePokemon"
  },

  render: function () {
    var content = this.template({ pokemon: this.model });
    this.$el.html(content);
  },

  savePokemon: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newPokemon = new Pokedex.Models.Pokemon();
    newPokemon.save(formData.pokemon, {
      success: function (model) {
        this.collection.add(model),
        Backbone.history.navigate("#/pokemon/" + model.escape("id")),
        this.model = new Pokedex.Models.Pokemon(),
        this.render();
      }.bind(this)
    });
  }
});
