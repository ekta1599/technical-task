const cryptoJs = require("crypto-js");
require("dotenv").config();

function encrypt(text, key) {
  if (text && key) 
    return cryptoJs.AES.encrypt(JSON.stringify(text), key.trim()).toString();
  else
    throw new Error("Key is not provided");
}
function decrypt(text, key) {
  if (text)
    return JSON.parse(
      cryptoJs.AES.decrypt(text, key.trim()).toString(cryptoJs.enc.Utf8)
    );
}
module.exports = { encrypt, decrypt };