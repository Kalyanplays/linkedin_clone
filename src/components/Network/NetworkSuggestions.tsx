import React from 'react';
import { UserPlus, X } from 'lucide-react';

interface NetworkSuggestion {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profileImage: string;
  mutualConnections: number;
}

export const NetworkSuggestions: React.FC = () => {
  const suggestions: NetworkSuggestion[] = [
    {
      id: '1',
      firstName: 'Alice',
      lastName: 'Johnson',
      headline: 'Product Manager at Google',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      mutualConnections: 12,
    },
    {
      id: '2',
      firstName: 'Bob',
      lastName: 'Smith',
      headline: 'Software Engineer at Microsoft',
      profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      mutualConnections: 8,
    },
    {
      id: '3',
      firstName: 'Carol',
      lastName: 'Davis',
      headline: 'UX Designer at Adobe',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      mutualConnections: 15,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">People you may know</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {suggestions.map((person) => (
          <div key={person.id} className="p-4">
            <div className="flex items-start space-x-3">
              <img
                src={person.profileImage}
                alt={`${person.firstName} ${person.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{person.headline}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {person.mutualConnections} mutual connections
                </p>
                
                <div className="flex items-center space-x-2 mt-3">
                  <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          Show more
        </button>
      </div>
    </div>
  );
};