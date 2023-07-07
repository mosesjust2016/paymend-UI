let keys = '4ef03de3-3848-48d0-9507-d90379a3d5d4'

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
    const encryptedAccessToken = encryptToken(token, keys);
    localStorage.setItem('access_token', encryptedAccessToken);

    return encryptedAccessToken;
}

function encryptRFunction(token) {
    // Encrypt and store the refresh token
    const encryptedAccessToken = encryptToken(token, keys);
    localStorage.setItem('refresh_token', encryptedAccessToken);

    return encryptedAccessToken;
}

function dencryptAFunction() {
    // Encrypt and store the access token
    const encryptedToken = localStorage.getItem('access_token');
    const accessToken = decryptToken(encryptedToken, keys);
    return accessToken;
}

function dencryptRFunction() {
    // Encrypt and store the access token
    const encryptedToken = localStorage.getItem('access_token');
    const accessToken = decryptToken(encryptedToken, keys);
    return accessToken;
}  


function checkAccessToken() {
    
    // Retrieve tokens and expiration times from the response or local storage
    const accessToken = dencryptAFunction();
    const accessTokenExp = new Date(localStorage.getItem('access_token_exp'));
    const refreshToken = dencryptRFunction();
    const refreshTokenExp = new Date(localStorage.getItem('refresh_token_exp'));
  
    // Check if the access token has expired
    if (accessTokenExp <= new Date()) {
      
      fetch("https://payments.mosesjasi.biz/paymendapi/auth/refresh", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${refreshToken}`
        }
      })
        .then(response => response.json())
        .then(data => {

        // Clear local storage
        localStorage.clear();

          // Update the access token and its expiration time
          const newAccessToken = data.access;
          const newRefreshToken = data.refresh;
          const accessTokenExp = new Date(localStorage.setItem('access_token_exp', data.access_exp));
          const refreshTokenExp = new Date(localStorage.setItem('refresh_token_exp', data.refresh_exp));


          encryptAFunction(newAccessToken);
          encryptRFunction(newRefreshToken)
  
        })
        .catch(error => {
          console.log("Error refreshing access token:", error);
        });
    } else {
      // Access token is still valid, continue with the authenticated requests
      // ...
    }
  }