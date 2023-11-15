var jwt = require('jsonwebtoken');
var FrillSSOKey = '7f2ab7ef-ca4b-45f1-96ce-80368b661647';
var userData = { 
  email: user.email,
  id: user.id,
  name: user.name,
};
var frillUserToken = jwt.sign(userData, FrillSSOKey, {algorithm: 'HS256'});