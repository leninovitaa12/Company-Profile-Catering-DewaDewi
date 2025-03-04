const jwt = require("jsonwebtoken");
const { caesarCipher } = require("../chiper/caesarChiper");
const { vigenereCipher } = require("../chiper/vigenereCipher");

const tokenAndCookie = (userId, res) => {
  // const encryptedIdCaesar = caesarCipher(userId, 5);
  // const encryptedIdVigenere = vigenereCipher(
  //   encryptedIdCaesar,
  //   "AzSxDcFvGbHnJm"
  // );
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000,
    httpOnly: true, //protect xss
    sameSite: "strict", //protect csrf
  });
};

module.exports = tokenAndCookie;
