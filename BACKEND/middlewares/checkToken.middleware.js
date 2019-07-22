/* eslint-disable*/

const jwt = require('jsonwebtoken');
const config = require('../config/env.config');


exports.checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('JWT ')) {
      // Remove JWT from string
      token = token.slice(4, token.length);
    }

    if (token) {
      jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Token is not valid',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied',
    });


  }
};
