import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileCard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 relative">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Content */}
      <div className="p-4">
        <div className="flex flex-col items-center -mt-12">
          <img
            src={user.profileImage}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
          />
          
          <div className="text-center mt-3">
            <h2 className="text-xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{user.headline}</p>
            
            <div className="flex items-center justify-center space-x-1 mt-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">{user.connections}</p>
              <p className="text-xs text-gray-600">Connections</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">{Math.floor(Math.random() * 200) + 50}</p>
              <p className="text-xs text-gray-600">Profile views</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">{Math.floor(Math.random() * 50) + 10}</p>
              <p className="text-xs text-gray-600">Post views</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};