
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  // State for the input fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Apollo useMutation hook
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          ...formData,
        },
      });
      console.log('Signup Success:', data.addUser);
      Auth.login(data.addUser.token);
      navigate('/profile');
      // Here, you could navigate to another route or write the token to local storage
      // e.g., localStorage.setItem('token', response.data.signUp.token);
    } catch (err) {
      console.error('Signup Error:', err);
    }
  };

  return (
    <div className='signupContainer'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className='signupForm'>
        <div className='signupFields btn'>
          <div>
            <label>Username:</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>Sign Up</button>
        </div>
      </form>
      {error && <p>Error signing up: {error.message}</p>}
    </div>
  );
}

export default SignUp;
