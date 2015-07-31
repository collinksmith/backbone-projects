$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('.users');

  this.$input.on('input', this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  $.ajax({
    dataType: "json",
    data: { query: this.$input.val() },
    url: "/users/search",
    type: "GET",
    success: function (users) {
      console.log(users);
      this.renderResults(users);
    }.bind(this),
    error: function () {
      console.log("Error in UserSearch.handleInput");
    }
  });
};

$.UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();
  users.forEach(function (user) {
    this.$ul.append($('<li><a href="/users/' + user.id + '/">' + user.username + '</a></li>'));
  }.bind(this));
};

$.fn.usersSearch = function () {
  return this.each( function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $('div.users-search').usersSearch();
});
