var express = require("express");
var app = express();
var cors = require("cors"); 
var jwt = require('jsonwebtoken');
const EmployeeController = require('./controllers/Employee')

require('dotenv').config();

const UserModel = require('./models/users');
const { sendEmailOTP } = require('./modules/email');
const authMiddleware = require("./middlewares/authMiddleware");

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/get-otp', async (req, res) => {
  const { account, type } = req.body;
  const otp = generateOTP();

  if (type === 'email') {
      sendEmailOTP(account, otp)
  }

  const expiresAt = Date.now() + 5 * 60 * 1000;

  await UserModel.createOrUpdate({
    email: account,
    otp,
    expiresAt: expiresAt,
  });

  return res.json({
    data: otp,
    success: true,
    message: 'Get OTP success'
  })
});

app.post('/verify-otp', async (req, res) => {
  const { account, otp } = req.body;

  try {
    const data = await UserModel.get(account);

    if (!data) {
      return res.status(404).json({ success: false, message: "Tài khoản không tồn tại hoặc chưa yêu cầu OTP." });
    }

    if (data.otp !== otp) {
      return res.json({ success: false, message: "OTP không đúng." });
    }

    const timeout = 5 * 60 * 1000

    if (Date.now() > data.expiresAt + timeout) {
      return res.json({ success: false, message: "OTP đã hết hạn." });
    }


    const payload = {
      account,
      otp
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    return res.json({ success: true, data: token, message: "OTP hợp lệ." });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Lỗi hệ thống." });
  }
});


app.get('/employee', authMiddleware, async (req, res) => {
  const employees = await EmployeeController.get()

  res.status(200).json({ data: employees, success: true })
})



app.post('/employee', authMiddleware, async (req, res) => {
  const { name, email, department, phone, address , status} = req.body
  const employee = await EmployeeController.create({
    name,
    email,
    department,
    phone,
    address,
    status
  })

  res.status(200).json({ data: employee, success: true })
})

app.post('/employee/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const employee = await EmployeeController.getByID(id)

  res.status(200).json({ data: employee, success: true })
})

app.post('/employee/:id/delete', authMiddleware, async (req, res) => {
  const { id } = req.params
  if (id) {
    const result = await EmployeeController.delete(id)
    if (result) res.status(200).json({ success: true })
  }
  res.status(200).json({ success: false })
})


app.listen(PORT, () => {
 console.log("Server running on port 3000");
});