import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL Query to fetch current user's profile
const GET_PROFILE = gql`
  query GetProfile {
    me {
      id
      username
      email
    }
  }
`;

// GraphQL Mutation to update the user's profile
const UPDATE_PROFILE = gql`
  mutation UpdateProfile($id: ID!, $username: String, $email: String, $avatarColor: String) {
    updateUser(id: $id, username: $username, email: $email, avatarColor: $avatarColor) {
      id
      username
      email
      avatar
    }
    token
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [editFields, setEditFields] = useState({
    id: '',
    username: '',
    email: '',
  });

  const [avatarColor, setAvatarColor] = useState('');
  const colorOptions = ['#F2E7DC', '#BFB3A4', '#4586BF', '#1F5AA6', '#151619'];

  useEffect(() => {
    if (data && data.me) {
      setEditFields({ ...data.me });
      setAvatarColor(colorOptions[0]); // Default = first color
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({
      ...editFields,
      [name]: value,

      });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        variables: {
          ...editFields,
          avatarColor: avatarColor
        },
      });
      alert("Profile updated successfully");
    } catch (e) {
      console.error("Error saving profile:", e);
      alert("Error updating profile. Please try again.");
    }
  };

  // Generates avatar based on the first letter of the username
  const generateAvatar = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="profileContainer">
      <h2>Edit Profile</h2>

      <div className='avatarContainer'>
        <div className="avatar" style={{ backgroundColor: avatarColor }}>
          {generateAvatar(editFields.username)}
        </div>
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button key={index} style={{ backgroundColor: color }} onClick={() => setAvatarColor(color)} />
          ))}
        </div>
      </div>

      <div className='editFields btn'>
        <div>
          <input name="username" value={editFields.username} onChange={handleInputChange} placeholder="Username" />
          <input type="email" name="email" value={editFields.email} onChange={handleInputChange} placeholder="Email" />
          <button onClick={handleSave}>Save Changes</button>
        </div>

      </div>
    </div>
  );
}