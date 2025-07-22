const nodemailer = require("nodemailer");

require('dotenv').config();


const USER_APP_MAIL = process.env.USER_APP_MAIL;
const PASS_APP_MAIL = process.env.PASS_APP_MAIL;



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_APP_MAIL,
    pass: PASS_APP_MAIL 
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOTP(email, otp) {  
  await transporter.sendMail({
    from: email,
    to: email,
    subject: "Mã OTP xác thực",
    text: `Mã OTP của bạn là: ${otp}. Hết hạn sau 5 phút.`
  });
}

async function verifyEmailOTP(email, userOtp) {
  const otpDoc = await getDoc(doc(db, "email_otps", email));
  if (!otpDoc.exists()) return false;

  const { otp, expiresAt } = otpDoc.data();
  const now = Date.now();

  if (otp === userOtp && now < expiresAt) {
    console.log("OTP hợp lệ");
    return true;
  } else {
    console.log("OTP không hợp lệ hoặc hết hạn");
    return false;
  }
}

module.exports = { sendEmailOTP, verifyEmailOTP };
