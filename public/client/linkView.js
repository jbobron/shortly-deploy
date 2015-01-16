Shortly.LinkView = Backbone.View.extend({
  className: 'link',

  template: Templates.link,

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    console.log("This:", this.model.attributes);
    return this;
  }
});
