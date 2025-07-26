import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

interface Conversation {
  id: string;
  participant: {
    firstName: string;
    lastName: string;
    profileImage: string;
    headline: string;
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
  };
}

export const MessageList: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      participant: {
        firstName: 'Sarah',
        lastName: 'Chen',
        profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        headline: 'Senior Product Manager at TechFlow',
        isOnline: true,
      },
      lastMessage: {
        content: 'Thanks for connecting! I\'d love to discuss potential collaboration opportunities.',
        timestamp: '2h',
        isRead: false,
      },
    },
    {
      id: '2',
      participant: {
        firstName: 'Michael',
        lastName: 'Rodriguez',
        profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        headline: 'DevOps Engineer at CloudScale Solutions',
        isOnline: false,
      },
      lastMessage: {
        content: 'The project looks great! When can we schedule a call to discuss the implementation details?',
        timestamp: '1d',
        isRead: true,
      },
    },
    {
      id: '3',
      participant: {
        firstName: 'Emily',
        lastName: 'Johnson',
        profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        headline: 'Co-Founder & CEO at InnovateTech',
        isOnline: true,
      },
      lastMessage: {
        content: 'Congratulations on the new role! Looking forward to working together.',
        timestamp: '3d',
        isRead: true,
      },
    },
  ];

  const filteredConversations = conversations.filter(conversation =>
    `${conversation.participant.firstName} ${conversation.participant.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex h-96">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.participant.profileImage}
                      alt={`${conversation.participant.firstName} ${conversation.participant.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.participant.firstName} {conversation.participant.lastName}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage.content}
                    </p>
                    
                    {!conversation.lastMessage.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const conversation = conversations.find(c => c.id === selectedConversation);
                      return conversation ? (
                        <>
                          <div className="relative">
                            <img
                              src={conversation.participant.profileImage}
                              alt={`${conversation.participant.firstName} ${conversation.participant.lastName}`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            {conversation.participant.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {conversation.participant.firstName} {conversation.participant.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{conversation.participant.headline}</p>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* Sample messages */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                      Hi! Thanks for accepting my connection request.
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg max-w-xs">
                      Thanks for connecting! I'd love to discuss potential collaboration opportunities.
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm mt-1">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};