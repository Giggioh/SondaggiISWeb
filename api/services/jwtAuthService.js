var jwt = require('jsonwebtoken');

// With this method we generate a new token based on payload we want to put on it
module.exports={
  issueToken: function (payload) {
    return jwt.sign(
      JSON.stringify(payload),
      '123456'
    );
  },

  verifyToken: function (token) {
    return jwt.verify(
      token,
      '123456',
      {}
    );
  }
};
