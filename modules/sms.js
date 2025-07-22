const { RecaptchaVerifier, signInWithPhoneNumber } = require("firebase/auth");
const { auth } = require("./firebaseConfig");

const sendOTP = async (phoneNumber) => {
  try {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    console.log("OTP sent!");
    return confirmationResult;
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
};

// Gọi hàm
sendOTP('+84393136496');
