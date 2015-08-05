window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#root');
    new JournalApp.Routers.Router({ $rootEl: $rootEl });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
