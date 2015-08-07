NewsReader.Collections.Feeds = Backbone.Collection.extend({
  url: "/api/feeds",

  model: NewsReader.Models.Feed,

  comparator: 'title',

  getOrFetch: function (id) {
    var feeds = this;
    var feed = this.get(id);
    if (feed) {
      feed.fetch();
    } else {
      feed = new NewsReader.Models.Feed({ id: id });
      feed.fetch({success: function () {
        feeds.add(feed);
      }});

    }

    return feed;
  }
});
