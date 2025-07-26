import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('linkedinUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Create a demo user for first-time visitors
      const demoUser: User = {
        id: 'demo-1',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        headline: 'Software Engineer at Tech Corp',
        location: 'San Francisco, CA',
        bio: 'Passionate software developer with 5+ years of experience in full-stack development. I love building scalable applications and mentoring junior developers. Always eager to learn new technologies and tackle challenging problems.',
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
        connections: 234,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
      const userExists = existingUsers.find((u: User) => u.email === demoUser.email);
      
      if (!userExists) {
        const updatedUsers = [...existingUsers, demoUser];
        localStorage.setItem('linkedinUsers', JSON.stringify(updatedUsers));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check if user exists in localStorage first
      const existingUsers = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
      const existingUser = existingUsers.find((u: User) => u.email === email);
      
      if (!existingUser) {
        throw new Error('User not found');
      }
      
      localStorage.setItem('linkedinUser', JSON.stringify(existingUser));
      setUser(existingUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
      const userExists = existingUsers.find((u: User) => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        headline: userData.headline,
        location: userData.location,
        bio: `Welcome to my profile! I'm ${userData.firstName} ${userData.lastName}, ${userData.headline} based in ${userData.location}. I'm passionate about connecting with like-minded professionals and exploring new opportunities.`,
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
        connections: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save to users array
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('linkedinUsers', JSON.stringify(updatedUsers));
      
      localStorage.setItem('linkedinUser', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('linkedinUser');
    setUser(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
    
    // Update in users array
    const existingUsers = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
    const updatedUsers = existingUsers.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('linkedinUsers', JSON.stringify(updatedUsers));
    
    localStorage.setItem('linkedinUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};