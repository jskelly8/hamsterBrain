const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// const secret = process.env.SECRET;
const secret = 'your_jwt_secret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return { user: null };
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      return { user: data };
    } catch (e) {
      console.log('Invalid token:', e.message);
      throw new GraphQLError('Could not authenticate user due to invalid token.', {
        extensions: {
          code : 'UNAUTHENTICATED',
        },
      });
    }

    return req;
  },
  signToken: function ({ email, username, _id, avatarColor }) {

    const payload = { email, username, _id, avatarColor };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
