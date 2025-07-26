import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Post } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost } = useApp();
  const [showComments, setShowComments] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <img
              src={post.user.profileImage}
              alt={`${post.user.firstName} ${post.user.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {post.user.firstName} {post.user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{post.user.headline}</p>
              <p className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="px-4 pb-3">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            {post.likes > 0 && (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-3 h-3 text-white" />
                  </div>
                  <span>{post.likes}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {post.comments > 0 && <span>{post.comments} comments</span>}
            {post.shares > 0 && <span>{post.shares} shares</span>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
              post.isLiked ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">Like</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
            <Share className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-start space-x-3">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="Your profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};