module.exports.db = {
  secret: process.env.secret,
  mongodbUri: process.env.mongodbUri
};

module.exports.slack = {
  slack: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
  },
  session: {
    cookieKey: process.env.cookieKey
  }
};

module.exports.session = process.env.session;