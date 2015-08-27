export default {
  name: "extend-post",

  initialize: function (container) {

    Ember.View.reopen({
      didInsertElement: function() {
        this._super();
        if(this.element && this.element.id == "topic-closing-info") {
          var topic = $('#topic');
          var topic_id = topic.data('topic-id');
          var group = Discourse.SiteSettings.group;

          $.ajax("/highlight_post", {
            type: 'GET',
            data: { topic_id: topic_id, group: group }
          }).done(function(res){
            if(res.highlight_post){
              $('.top-answer-link').parent().removeClass('hidden');
              $("article.boxed[data-post-id='"+ res.post_id +"']").addClass('most_liked_post');
            }
          });
        }
      }
    });
  }
};

