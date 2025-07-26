export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  connections: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  userId: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  documentUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
    headline: string;
    profileImage: string;
  };
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
}

export interface Connection {
  id: string;
  requesterId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  user: User;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage: Message;
  updatedAt: string;
  participants: User[];
}