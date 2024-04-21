const express = require('express');

const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/users');

module.exports = router;
//Post Method

router.post('/post', (req, res) => {
    res.send('Post API')
})

//đăng ký tạo người dùng
router.post('/Register', async (req, res) => {
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
        console.error('Người dùng đã tồn tại:', existingUser);
              return  res.status(400).json({message: 'Email đã tồn tại - Hãy nhập Email khác'})         
      }
      // Số vòng lặp (độ phức tạp của việc mã hóa)
const saltRounds = 10;

// Mã hóa mật khẩu
 const hashPass = bcrypt.hashSync(req.body.password, saltRounds);
    const data = new user({
        username: req.body.username,
        password: hashPass,
        email:req.body.email,
        brithday:req.body. brithday,
    })
   
       try {
        const dataToSave = await data.save();
     
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//đăng nhập
router.post('/Login', async (req, res) => {
    try {
        // const data = new user({       
        //     password: req.body.password,
        //     email:req.body.email,           
        // })
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email: req.body.email });

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        //const userDetail = await user.findOne({email });
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid||!existingUser) {
            return res.status(401).json({ message: 'Đăng nhập không thành công' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: existingUser._id }, 'your-secret-key', { expiresIn: '1h' });

        // Send token in response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//Get all Method
router.get('/getAll', (req, res) => {
    res.send('chan lam goi nha')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})