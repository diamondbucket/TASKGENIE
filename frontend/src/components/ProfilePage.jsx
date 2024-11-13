import React, { useState } from 'react';

const ProfilePage = () => {
  // Sample profile state (could be fetched from a database)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'I am a task manager enthusiast and productivity guru!',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder image URL
  });

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md sketch-border max-w-lg">

<div className="flex justify-center mb-6">
    <img
      src={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      alt="Profile"
      className="w-32 h-32 rounded-full shadow-xl border-2 border-gray-300 sketch-border"
    />
  </div>


      {/* Profile Information */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 font-cursive sketch-text">
          {profile.name}
        </h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600 mt-4">{profile.bio}</p>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center">
        <button className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
