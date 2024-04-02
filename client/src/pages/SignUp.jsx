import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the addProfile mutation
const ADD_PROFILE_MUTATION = gql`
  mutation AddProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      _id
      username
      name
      email
    }
  }
`;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useMutation hook for the addProfile mutation
  const [addProfile, { data, loading, error }] = useMutation(ADD_PROFILE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Execute the addProfile mutation
      await addProfile({
        variables: {
          name,
          email,
          password,
        },
      });
      // Handle success (e.g., redirect to login, show success message)
      console.log('Profile created successfully', data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error creating profile', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Profile...' : 'Sign Up'}
        </button>
      </form>
      {error && <p>Error creating profile. Please try again.</p>}
    </div>
  );
};

export default SignUp;