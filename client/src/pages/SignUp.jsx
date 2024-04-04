// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';




// const ADD_USER_MUTATION = gql`
//   mutation AddUser($username: String!, $email: String!, $password: String!) {
//     addUser(username: $username, email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//         email
//       }
//     }
//   }
// `;


// const SignUp = () => {
//   const [username, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // useMutation hook for the addProfile mutation
//   const [addProfile, { data, loading, error }] = useMutation(ADD_USER_MUTATION);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Execute the addProfile mutation
//       await addProfile({
//         variables: {
//           username,
//           email,
//           password,
//         },
//       });
//       // Handle success (e.g., redirect to login, show success message)
//       console.log('Profile created successfully', data);
//     } catch (error) {
//       // Handle error (e.g., show error message)
//       console.error('Error creating profile', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating Profile...' : 'Sign Up'}
//         </button>
//       </form>
//       {error && <p>Error creating profile. Please try again.</p>}
//     </div>
//   );
// };

// export default SignUp;

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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
      {error && <p>Error signing up: {error.message}</p>}
    </div>
  );
}

export default SignUp;
