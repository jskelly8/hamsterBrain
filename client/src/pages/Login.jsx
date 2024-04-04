import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the login mutation
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      name
      email
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useMutation hook
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Execute the login mutation
      await login({
        variables: {
          email,
          password,
        },
      });
      // Handle success (e.g., redirect, show message)
      console.log('Login successful', data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error logging in', error);
    }
  };

  return (
    <div className='loginContainer'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='loginForm'>
        <div className='loginFields btn'>
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      {error && <p>Error logging in. Please try again.</p>}
    </div>
  );
};

export default Login;