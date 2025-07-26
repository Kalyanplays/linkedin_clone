import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Layout/Header';
import { ProfileCard } from './components/Profile/ProfileCard';
import { ProfileView } from './components/Profile/ProfileView';
import { CreatePost } from './components/Feed/CreatePost';
import { PostCard } from './components/Feed/PostCard';
import { NetworkSuggestions } from './components/Network/NetworkSuggestions';
import { MessageList } from './components/Messaging/MessageList';
import { useApp } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const { posts } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileView />;
      case 'network':
        return (
          <div className="max-w-4xl mx-auto">
            <NetworkSuggestions />
          </div>
        );
      case 'messaging':
        return <MessageList />;
      case 'notifications':
        return (
          <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
            <p className="text-gray-600">No new notifications</p>
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              <CreatePost />
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-3">LinkedIn News</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Tech industry outlook</p>
                    <p className="text-gray-600">2h ago • 1,234 readers</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Remote work trends</p>
                    <p className="text-gray-600">4h ago • 856 readers</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Salary negotiations</p>
                    <p className="text-gray-600">1d ago • 2,341 readers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-6 px-4">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;