
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


// Define the GraphQL mutation
const SIGN_UP_MUTATION = gql`
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    token
    user {
      username
      email
    }
  }
}
`;

function SignUp() {
  // State for the input fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Apollo useMutation hook
  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp({
        variables: {
          input: formData,
        },
      });
      console.log('Signup Success:', response.data.signUp);
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
