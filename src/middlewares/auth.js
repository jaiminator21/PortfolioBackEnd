const User = require("../api/models/users.model");
const { verifySign } = require("../utils/jwt"); // import function from jwt.js

const isAuth = async (req, res, next) => { 
  try {
    const authorization = req.headers.authorization;
    if (!authorization) { // if there are no authorization headers 
      return res.status(401).json({ message: "Unauthorized connection." });
    }
    const token =
      authorization.split(
        " "
      )[1]; /* token clean up, format = Bearer <token> -> this is done to separate Bearer from thetoken */

    if (!token) { // checks if there is a token
      return res.status(401).json({ message: "Invalid token." });
    }
    const tokenVerified =verifySign(token); // if there is a token we verify is authenticity

    if (!tokenVerified.id) { // if token isn't authenitc (fake) it will send us an error
      return res.status(401).json(tokenVerified);
    }
    const userLogged = await User.findById( // if token is authenitc it will search for the user in the DB
      tokenVerified.id
    ); 
    req.user = userLogged; //lets the hole app know the user is authentic

    next(); // goes to the function that follows the [isAuth] on the routes
  } catch (error) {
    return res.status(500).json(error); //prints error msg
  }
};

module.exports = {
  isAuth,
};
