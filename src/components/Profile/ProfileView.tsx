import React, { useState } from 'react';
import { MapPin, Calendar, Briefcase, GraduationCap, Edit3, Plus, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    location: '',
    bio: '',
  });

  if (!user) return null;

  const handleEditStart = () => {
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      headline: user.headline,
      location: user.location,
      bio: user.bio,
    });
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditForm({
      firstName: '',
      lastName: '',
      headline: '',
      location: '',
      bio: '',
    });
  };

  const mockExperience = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: null,
      current: true,
      description: 'Leading a team of 5 developers in building scalable web applications using React, Node.js, and AWS. Responsible for architecture decisions and mentoring junior developers.',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: 'Developed full-stack applications using modern web technologies. Collaborated with design and product teams to deliver user-centric solutions.',
    },
  ];

  const mockEducation = [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2016-08',
      endDate: '2020-05',
      current: false,
      description: 'Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems.',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (start: string, end: string | null) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
    if (remainingMonths === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-20">
            <img
              src={user.profileImage}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Last Name"
                        />
                      </div>
                      <input
                        type="text"
                        value={editForm.headline}
                        onChange={(e) => setEditForm(prev => ({ ...prev, headline: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Professional Headline"
                      />
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Location"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-lg text-gray-600 mt-1">{user.headline}</p>
                      
                      <div className="flex items-center space-x-1 mt-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    </>
                  )}
                  
                  <p className="text-blue-600 font-medium mt-1">{user.connections} connections</p>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleEditStart}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Message
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* About Section */}
          {activeSection === 'about' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">About</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditStart}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleEditCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add experience</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {mockExperience.map((exp) => (
                  <div key={exp.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)} · {calculateDuration(exp.startDate, exp.endDate)}
                      </p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add education</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {mockEducation.map((edu) => (
                  <div key={edu.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                      <p className="text-gray-600">{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate!)}
                      </p>
                      <p className="text-gray-700 mt-2">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add skill</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS',
                  'PostgreSQL', 'Git', 'Docker', 'Kubernetes', 'GraphQL', 'Redux'
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-50 px-4 py-2 rounded-lg text-center text-gray-700 font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};