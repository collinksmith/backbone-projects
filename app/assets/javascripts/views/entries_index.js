NewsReader.Views.EntriesIndex = Backbone.CompositeView.extend({
  template: JST['entries_index'],

  // tagName: "ul",
  // className: "entry-items",

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addEntryView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addEntryView.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addEntryView: function (entry) {
    var subview = new NewsReader.Views.EntryShow({ model: entry });
    this.addSubview('.entry-items', subview);
  }
});
