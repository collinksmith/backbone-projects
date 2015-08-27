Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.new-pokemon');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();
    window.view = this;
    this.$pokeList.on("click",
                      "li.poke-list-item",
                      this.selectPokemonFromList.bind(this));
    this.$pokeDetail.on("click",
                        "li.toy-list-item",
                        this.selectToyFromList.bind(this));
    this.$newPoke.on("submit",
                      this.submitPokemonForm.bind(this));
  },

  submitPokemonForm: function (event) {
    event.preventDefault();
    var pokemon = $(event.currentTarget).serializeJSON().pokemon;
    this.createPokemon(pokemon,this.renderPokemonDetail.bind(this));
  },

  selectPokemonFromList: function (event) {
    var $li = $(event.currentTarget);
    var id = $li.data('id');
    var pokemon = this.pokemon.findWhere({ id: id });
    if(pokemon) {
      this.renderPokemonDetail(pokemon);
    }
  },

  selectToyFromList: function (event) {
    // debugger;
    var $li = $(event.currentTarget);
    var toyId = $li.data('toy-id');
    var pokemonId = $li.data('pokemon-id');
    var pokemon = this.pokemon.findWhere({ id: pokemonId });
    var toy = pokemon.toys().findWhere({ id: toyId});
    this.renderToyDetail(toy);
  },

  addPokemonToList: function(pokemon) {
    var $li = $('<li class="poke-list-item">');
    $li.data( {id: pokemon.get('id')});

    var htmlString = "name: " +
                  pokemon.get('name') +
                  " poketype: " +
                  pokemon.get('poke_type');
    $li.html(htmlString);
    this.$pokeList.append($li);
  },

  refreshPokemon: function() {
    var that = this;
    this.$pokeList.empty();
    this.pokemon.fetch({
      success: function(collection, resp, options) {
        collection.each(function (poke) {
          that.addPokemonToList(poke);
        });
      }
    });
  },
  
  renderToyDetail: function (toy) {
    $('.toy-detail').empty();
    var $div = $('<div class="detail">');
    var $img = $('<img src=' + toy.get('image_url') + '>');
    $div.append($img);
    this.$toyDetail.append($div);
  },

  renderPokemonDetail: function (pokemon) {
    var $div = $('<div class="detail">');
    var $img = $('<img src=' + pokemon.get('image_url') + '>');

    var $ul = $('<ul>');
    _.each(pokemon.keys(), function (attribute) {
      var $attributeInfo = $('<li>');
      $attributeInfo.html(attribute + ": " + pokemon.get(attribute));
      $ul.append($attributeInfo);
    });

    $div.append($img);
    $div.append($ul);

    this.$pokeDetail.html($div);

    var $ulToys = $('<ul class="toys">');
    pokemon.fetch({
      success: function () {
        pokemon.toys().each(function (toy) {
          this.addToyToList(toy, $ulToys);
        }.bind(this));
      }.bind(this)
    });
    this.$pokeDetail.append($ulToys);
  },

  addToyToList: function (toy, $ulToys) {
    var $toyItem = $('<li class="toy-list-item">');
    $toyItem.data('toy-id', toy.get('id'));
    $toyItem.data('pokemon-id', toy.get('pokemon_id'));
    var $toyList = $('<ul>');
    $toyItem.append($toyList);
    var attributes = ['name', 'happiness', 'price'];
    attributes.forEach(function (attribute) {
      var $toyInfo = $('<li>');
      $toyInfo.html(attribute + ": " + toy.escape(attribute));
      $toyList.append($toyInfo);
    });
    $ulToys.append($toyItem);
  },

  createPokemon: function (attributes, callback) {
    var that = this;

    var newPokemon = new Pokedex.Models.Pokemon(attributes);
    newPokemon.save({}, {
      success: function () {
        that.pokemon.add(newPokemon);
        that.addPokemonToList(newPokemon);
        callback(newPokemon);
      }
    });
  }
});
