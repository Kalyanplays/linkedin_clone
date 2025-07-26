import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Connection, Message } from '../types';

interface AppContextType {
  posts: Post[];
  connections: Connection[];
  messages: Message[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  likePost: (postId: string) => void;
  addConnection: (connection: Omit<Connection, 'id' | 'createdAt'>) => void;
  updateConnectionStatus: (connectionId: string, status: 'accepted' | 'declined') => void;
  sendMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    content: 'Excited to share that our team just launched a new AI-powered feature that helps developers write better code! The future of software development is here. 🚀 #AI #SoftwareDevelopment #Innovation',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    likes: 42,
    comments: 8,
    shares: 3,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: {
      firstName: 'Sarah',
      lastName: 'Chen',
      headline: 'Senior Product Manager at TechFlow',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  },
  {
    id: '2',
    userId: '3',
    content: 'Just completed my certification in Cloud Architecture! Big thanks to my mentor and team for their support throughout this journey. Always learning, always growing! 📚 #CloudComputing #AWS #ProfessionalDevelopment',
    likes: 28,
    comments: 12,
    shares: 5,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    user: {
      firstName: 'Michael',
      lastName: 'Rodriguez',
      headline: 'DevOps Engineer at CloudScale Solutions',
      profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  },
  {
    id: '3',
    userId: '4',
    content: 'Thrilled to announce that our startup just closed our Series A funding round! This milestone wouldn\'t have been possible without our amazing team and investors who believed in our vision. Here\'s to scaling new heights! 🎉 #Startup #Funding #Entrepreneurship',
    likes: 156,
    comments: 34,
    shares: 18,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    user: {
      firstName: 'Emily',
      lastName: 'Johnson',
      headline: 'Co-Founder & CEO at InnovateTech',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const addConnection = (connection: Omit<Connection, 'id' | 'createdAt'>) => {
    const newConnection: Connection = {
      ...connection,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setConnections(prev => [...prev, newConnection]);
  };

  const updateConnectionStatus = (connectionId: string, status: 'accepted' | 'declined') => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId ? { ...conn, status } : conn
    ));
  };

  const sendMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const value = {
    posts,
    connections,
    messages,
    addPost,
    likePost,
    addConnection,
    updateConnectionStatus,
    sendMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};