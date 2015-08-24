export default Ember.Component.extend({
  tagName: 'li',
  layoutName: 'components/link-top-answer',
  classNameBindings: ['shouldBeHidden:hidden'],

  shouldBeHidden: true,

  title: function(){
    return Discourse.SiteSettings.link_text;
  }.property('title'),

  actions: {
    scrollTopAnswer: function() {
      $('html,body').animate({scrollTop: ($('.most_liked_post').offset().top-65)}, 'slow');
    }
  }
});
