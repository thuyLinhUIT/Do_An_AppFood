const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../model/users");
const comment = require('../model/comment');

const { default: mongoose } = require("mongoose");

// const upload = require("../middleware/upload");
// const { GridFsStore } = require("multer-gridfs-storage");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log(file);
//   },
// });
// const upload = multer({ storage });

module.exports = router;
//Post Method

router.post("/post", (req, res) => {
  res.send("Post API");
});

//đăng ký tạo người dùng
router.post("/Register", async (req, res) => {
  //kiểm tra người dùng đã sử dụng email này chưa
  const existingUser = await user.findOne({ email: req.body.email });
  if (existingUser) {
    console.error("Người dùng đã tồn tại:", existingUser);
    return res
      .status(400)
      .json({ message: "Email đã tồn tại - Hãy nhập Email khác" });
  }
  // Số vòng lặp (độ phức tạp của việc mã hóa)
  const saltRounds = 10;

  // Mã hóa mật khẩu
  const hashPass = bcrypt.hashSync(req.body.password, saltRounds);
  const data = new user({
    username: req.body.username,
    password: hashPass,
    email: req.body.email,
    brithday: req.body.brithday,
    avatar: 'https://res.cloudinary.com/dyt6imwou/image/upload/v1714646769/mbmma9jy0q9v6ktzeng0.jpg'
    // avatar: req.body.avatar,
    // gender: req.body.gender
  });

  try {
    console.log(req.data)
    const dataToSave = await data.save();

    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//đăng nhập
router.post("/Login", async (req, res) => {
  try {
    // console.log("back nhan login",req.body)
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email: req.body.email });

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // console.log("linh"+existingUser)
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid || !existingUser) {
      return res.status(401).json({ message: "Đăng nhập không thành công" });
    }

    // Generate JWT token

    const token = jwt.sign({ userId: existingUser._id }, "your-secret-key", {
      expiresIn: "5h",
    });


    // Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Đăng xuất
router.post("/logout", (req, res) => {
  // Xử lý việc đăng xuất (ví dụ: xóa token, xóa phiên người dùng, ...)
  // ...

  res.status(200).json({ message: "Logged out successfully" });
});

//Upload Image
router.post("/uploadAvatar", async (req, res) => {
  console.log("Back UpdateAtatar nhaan", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    //   console.log(token);

    const valueToken = jwt.verify(token, "your-secret-key");
    //   console.log(valueToken.userId);
    const userReal = valueToken.userId;

    await user.updateOne({ _id: userReal }, { avatar: req.body.image });
    const existingUser = await user
      .findOne({ _id: userReal })
      .select("-password");
    //   const existingUser = await user.findOne({ _id: userReal });
    // console.log(existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("loi up anh", error);
    res.status(400).json({ message: error.message });
  }
});
//Upload Info User
router.put("/uploadInfoUser", async (req, res) => {
  console.log("Back UpdateInfo nhaan", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    //   console.log(token);

    const valueToken = jwt.verify(token, "your-secret-key");
    //   console.log(valueToken.userId);
    const userReal = valueToken.userId;
    const update = {
      $set: {
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        brithday: req.body.brithday,
      },
    };

    await user.updateOne({ _id: userReal }, update);

    const existingUser = await user
      .findOne({ _id: userReal })
      .select("-password");
    //   const existingUser = await user.findOne({ _id: userReal });
    console.log("thoong tin laay tu CSDL ", existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("loi update Thong tin", error);
    res.status(400).json({ message: error.message });
  }
});

//Upload thêm 1 favourite
router.post("/updateFavourite", async (req, res) => {
  // console.log("Back UpdateInfo nhaan", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    //   console.log(token);

    const valueToken = jwt.verify(token, "your-secret-key");
    //   console.log(valueToken.userId);
    const userReal = valueToken.userId;

    const existingUser = await user
      .findOne({ _id: userReal })
      .select("-password");

    if (existingUser && existingUser.favourite.includes(req.body.favourite)) {
      // console.log("Mục đã tồn tại trong danh sách yêu thích của người dùng.");
      return res.status(200).json(existingUser);
    }
    await user.updateOne({ _id: userReal }, { $push: { favourite: req.body.favourite } });
    //   const existingUser = await user.findOne({ _id: userReal });
    // console.log("thoong tin laay tu CSDL ", existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("loi add Favourite", error);
    res.status(400).json({ message: error.message });
  }
});

// //Delete 1 favourite
router.delete("/Delete1favourite/:favourite", async (req, res) => {
  console.log("Back Delete Favorite nhaan", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const valueToken = jwt.verify(token, "your-secret-key");
    const userReal = valueToken.userId;

    const itemToRemove = req.params.favourite; // Giá trị bạn muốn xóa

    await user.findOneAndUpdate({ _id: userReal }, { $pull: { favourite: itemToRemove } });

    const existingUser = await user.findOne({ _id: userReal }).select("-password");
    console.log("Thông tin lấy từ CSDL:", existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    console.log("Lỗi Delete Favourite:", error);
    res.status(400).json({ message: error.message });
  }
});


//Get by ID data User. Lấy thông tin user
router.get("/getUser/:id", async (req, res) => {
  try {
    //   console.log(req.params.id);
    const token = req.headers.authorization.split(" ")[1];

    const valueToken = jwt.verify(token, "your-secret-key");
    const userReal = valueToken.userId;
    const existingUser = await user
      .findOne({ _id: userReal })
      .select("-password");
    // console.log(existingUser);
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Tạo lưu comment
router.post("/sendComment/", async (req, res) => {
  try {
    console.log("comment back nhận ", req.body)
    // const dataToSave = await data.save();
    const token = req.headers.authorization.split(" ")[1];
    //   console.log(token);

    const valueToken = jwt.verify(token, "your-secret-key");
    const idUser = valueToken.userId;

    const data = new comment({
      idMeal: req.body.idMeal,
      idUser: idUser,
      avatar: req.body.avatar,
      content: req.body.content,
      date: req.body.date,
      username: req.body.username
    });
    const dataToSave = await data.save();
    console.log("thoong tin back gui len front ", dataToSave);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Lấy các comment lên
router.get("/getComment/:idMeal", async (req, res) => {
  try {
    //  console.log(req.params.idMeal);
    const idMeal = req.params.idMeal;

    // Lấy tất cả comment có cùng idMeal  
    const comments = await comment.find({ idMeal: idMeal }).select('-_id -idMeal -idUser -__v');
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});