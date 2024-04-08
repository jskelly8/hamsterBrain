import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { GET_PROFILE } from '../utils/queries';

export default function Profile() {
  const { data, loading, error } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_USER);

  const [editFields, setEditFields] = useState({
    username: '',
    email: '',
  });

  const [avatarColor, setAvatarColor] = useState('');
  const colorOptions = ['#F2E7DC', '#BFB3A4', '#4586BF', '#1F5AA6', '#151619'];

  useEffect(() => {
    if (data && data.me) {
      setEditFields({
        username: data.me.username || '',
        email: data.me.email || '',
      });
      setAvatarColor(data.me.avatarColor || colorOptions[0]);  // Default = first color
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile({
        variables: {
          ...editFields,
          avatarColor: avatarColor
        },
      });
      if (response.data) {
        alert("Profile updated successfully");
      }
    } catch (e) {
      console.error("Error saving profile:", e);
      alert("Error updating profile. Please try again.");
    }
  };

  // Generates avatar based on the first letter of the username
  const generateAvatar = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

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