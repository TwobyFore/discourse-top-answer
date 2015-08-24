PostsController.class_eval do

  skip_before_filter :ensure_logged_in, only: :highlight_post

  HIGHLIGHTS_TYPES = { most_liked_post: 'most_liked_post' }

  def highlight_post
    begin
      topic = Topic.find(params[:topic_id])
      unless topic.private_message?
        most_liked_post = topic.posts.joins(user: [group_users:[:group]]).where(groups: {name: params[:group]}).order(like_count: :desc).limit(1).first
        if most_liked_post.present? && most_liked_post.like_count > 0
          render json: { highlight_post: true, post_id: most_liked_post.id }
        else
          render json: { highlight_post: false }
        end
      else
        render json: { highlight_post: false }
      end
    rescue
      render json: { highlight_post: false }
    end
  end

end
