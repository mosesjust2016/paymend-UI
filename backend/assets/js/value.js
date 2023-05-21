// Encrypt the token
function encryptToken(token, key) {
    // Convert the token and key to WordArray objects
    var tokenBytes = CryptoJS.enc.Utf8.parse(token);
    var keyBytes = CryptoJS.enc.Utf8.parse(key);
  
    // Encrypt the token using AES encryption
    var encrypted = CryptoJS.AES.encrypt(tokenBytes, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  
    // Return the encrypted token as a string
    return encrypted.toString();
}

// Decrypt the token
function decryptToken(encryptedToken, key) {
    // Convert the key to a WordArray object
    var keyBytes = CryptoJS.enc.Utf8.parse(key);
  
    // Decrypt the token using AES decryption
    var decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  
    // Convert the decrypted bytes to a string
    var decryptedToken = CryptoJS.enc.Utf8.stringify(decryptedBytes);
  
    // Return the decrypted token
    return decryptedToken;
}


  


function encryptAFunction(token) {
    // Encrypt and store the access token
    const encryptedAccessToken = encryptToken(token);
    localStorage.setItem('access_token', encryptedAccessToken);

    return encryptedAccessToken;
}

function encryptRFunction(token) {
    // Encrypt and store the refresh token
    const encryptedAccessToken = encryptToken(token);
    localStorage.setItem('refresh_token', encryptedAccessToken);

    return encryptedAccessToken;
}

function dencryptAFunction() {
    // Encrypt and store the access token
    const encryptedToken = localStorage.getItem('access_token');
    const accessToken = decryptToken(encryptedToken);
    return accessToken;
}

function dencryptRFunction() {
    // Encrypt and store the access token
    const encryptedToken = localStorage.getItem('access_token');
    const accessToken = decryptToken(encryptedToken);
    return accessToken;
}