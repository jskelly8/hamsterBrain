import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { GET_PROFILE } from '../utils/queries';
import { Link } from 'react-router-dom';
import { ADD_PARTNER } from '../utils/mutations';


export default function Profile() {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      if (!sessionStorage.getItem('reloaded')) {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload();
      } else {
        sessionStorage.removeItem('reloaded');
      }
    }
  });
  const [updateProfile] = useMutation(UPDATE_USER);
  const [addPartner] = useMutation(ADD_PARTNER);
  const [editFields, setEditFields] = useState({
    id: '',
    username: '',
    email: '',
    points: '0',
    partner: '',
  });

  const [avatarColor, setAvatarColor] = useState('');
  const colorOptions = ['#F2E7DC', '#BFB3A4', '#4586BF', '#1F5AA6', '#151619'];

  useEffect(() => {
    if (data && data.me) {
      setEditFields({
        username: data.me.username || '',
        email: data.me.email || '',
        points: data.me.points || 0
      });
      setAvatarColor(data.me.avatarColor || colorOptions[0]);
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
          avatarColor: avatarColor,
        },
        update: (cache, { data }) => {
          if (!data) return;
          const existingProfile = cache.readQuery({
            query: GET_PROFILE,
          });
          cache.writeQuery({
            query: GET_PROFILE,
            data: {
              me: {
                ...existingProfile.me,
                avatarColor: avatarColor,
              },
            },
          });
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
const handleAddPartner = async () => {
  try {
    const response = await addPartner({
      variables: {
        partner: editFields.partner,
      },
    });
    if (response.data) {
      setEditFields(prevFields => ({
        ...prevFields,
        partner: '',
      }))
    }
  }
  catch (error) {
    console.error("Error adding partner:", error);
    alert("Error adding partner. Please try again.");
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
    <div className="profileCenter">
      <div className='avatarContainer'>
        <div><h4>Choose an avatar color:</h4></div>
        <div className="avatar" style={{ backgroundColor: avatarColor }}>
          {generateAvatar(editFields.username)}
        </div>
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button key={index} style={{ backgroundColor: color }} onClick={() => setAvatarColor(color)} />
          ))}
        </div>
      </div>
      <div className="buddyBox">
            <div className="testing"><h5>Your Buddy Id is:
            {`\n`}{data.me.buddyId}
            {`\n`} </h5></div>
            {data.me.partner ? (
              <>
            <h5 className="testing2"> View your Buddy&apos;s tasks:
              {`\n`}
              <Link to="/partnertasks">{data.me.partner}</Link>
            </h5>
            </>
            ) : (
              <div>
                <p>Enter your Buddy&apos;s ID:</p>
                <input
                  type="text"
                  name="partner"
                  value={editFields.partner}
                  onChange={handleInputChange}
                  placeholder="Buddy's ID"
                  />
                  <button onClick={handleAddPartner}>Add Buddy</button>
                  </div>
            )
          }
      </div>
    </div>

      <div className='editFields btn'>
        <div>
          <input name="username" value={editFields.username} onChange={handleInputChange} placeholder="Username" />
          <input type="email" name="email" value={editFields.email} onChange={handleInputChange} placeholder="Email" />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
      <div className='points'>
        {/* Display points */}
        <p>Points: {editFields.points}</p>
      </div>
    </div>
  );
}