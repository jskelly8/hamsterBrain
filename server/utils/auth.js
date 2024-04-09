const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Replace 'your_jwt_secret' with your actual secret, ideally fetched from an environment variable
const secret = 'your_jwt_secret'; 
const expiration = '2h';

// Custom error class for handling authentication errors
class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}

// Exporting the functionality
module.exports = {
  AuthenticationError, // Exporting the custom error class

  // Middleware for authentication
  authMiddleware: function ({ req }) {
    // Extracting token from different sources
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is present in the authorization header, extract it
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is provided, return with no user
    if (!token) {
      return { user: null };
    }

    // Try verifying the token
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Assign the extracted user data to the request
      return { user: data };
    } catch (e) {
      console.log('Invalid token:', e.message);
      // Throw an instance of AuthenticationError when verification fails
      throw new AuthenticationError('Could not authenticate user due to invalid token.');
    }
  },

  // Function for signing tokens
  signToken: function ({ email, username, _id, avatarColor, buddyId }) {
    const payload = { email, username, _id, avatarColor, buddyId };
    // Sign and return the JWT
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};