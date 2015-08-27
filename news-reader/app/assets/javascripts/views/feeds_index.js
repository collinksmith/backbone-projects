NewsReader.Views.FeedsIndex = Backbone.CompositeView.extend ({
  template: JST['feeds_index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addIndexItemView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addIndexItemView.bind(this));
  },

  addIndexItemView: function (item) {
    var subview = new NewsReader.Views.FeedsIndexItem({ model: item,
                                                        collection: this.collection});
    this.addSubview('.feed-list', subview);
  },

  render: function() {
    var content = this.template({feeds: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
