import React, { useState } from 'react';
import { Image, FileText, Video, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

export const CreatePost: React.FC = () => {
  const { user } = useAuth();
  const { addPost } = useApp();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPost({
      userId: user!.id,
      content: content.trim(),
      likes: 0,
      comments: 0,
      shares: 0,
      user: {
        firstName: user!.firstName,
        lastName: user!.lastName,
        headline: user!.headline,
        profileImage: user!.profileImage,
      },
    });

    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-start space-x-3">
        <img
          src={user?.profileImage}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Start a post..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={isExpanded ? 4 : 1}
            />
            
            {isExpanded && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Image className="w-5 h-5" />
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Video className="w-5 h-5" />
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium">Document</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium">Event</span>
                  </button>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};