const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models");

const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");
const { createMeasureData } = require("./measure-controller");

module.exports.register = tryCatch(async (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    confirmPassword,
    phone,
    nickname,
    lineId,
    houseNum,
    village,
    road,
    soi,
    district,
    subdistrict,
    province,
    postal,
    detail,
  } = req.body;
  // validation
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !username.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    !phone.trim() ||
    !nickname.trim() ||
    !lineId.trim() ||
    !houseNum.trim() ||
    !village.trim() ||
    !road.trim() ||
    !soi.trim() ||
    !district.trim() ||
    !subdistrict.trim() ||
    !province.trim() ||
    !postal.trim()
  ) {
    createError(400, "Please fill all require data");
  }
  // เช็คว่า
  if (password !== confirmPassword) {
    createError(400, "please check confirm password");
  }

  const newUser = {
    username: username,
    password: await bcrypt.hash(password, 10),
    firstName: firstName,
    lastName: lastName,
    nickname: nickname,
    phone: phone,
    lineId: lineId,
  };

  // สร้าง new user ใน database
  const result = await prisma.user.create({ data: newUser });
  console.log(result);

  const userId = result.id;

  const newUserAddress = {
    userId: userId,
    houseNum: houseNum,
    village: village,
    road: road,
    soi: soi,
    district: district,
    subdistrict: subdistrict,
    province: province,
    postal: postal,
    detail: detail,
  };

  const newMeasure = {
    shoulder: null,
    bust: null,
    frontTorsoWide: null,
    backTorsoWide: null,
    nipWideApart: null,
    waist: null,
    shirtLength: null,
    armCircumference: null,
    armLength: null,
    wrist: null,
    hip: null,
    highHip: null,
    lowHip: null,
    crotch: null,
    upperLegLength: null,
    lowerLegLength: null,
    userId: userId    
  }
  // สร้าง new user address ใน database
  const rs = await prisma.address.create({ data: newUserAddress });
  const measure = await prisma.measurement.create({ data: newMeasure });
  res.json({
    msg: "User and Address Registration Successful",
    user: result,
    address: rs,
    measure: measure
  });
});

module.exports.login = tryCatch(async (req, res) => {
  const { username, password } = req.body;
  // validation
  if (!username.trim() || !password.trim()) {
    createError(400, "Please fill all data");
  }
  // find user
  const foundUser = await prisma.user.findUnique({
    where: { username: username },
  });
  // if not found send error
  if (!foundUser) {
    createError(401, "Invalid Login");
  }
  // check password
  let truePassword = await bcrypt.compare(password, foundUser.password);
  if (!truePassword) {
    createError(401, "Invalid Login");
  }
  // create jwt token
  const payload = { id: foundUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const { password: pw, ...userData } = foundUser;

  res.json({ msg: "Login Successful", token: token, user: userData });
});

module.exports.address = tryCatch(async (req, res) => {
  const userId = req.user.id;
  const address = await prisma.address.findFirst({
    where: { userId: userId },
  });

  if (!address) {
    createError(404, "Address not found");
  }

  res.json({ address });
});

module.exports.updateAddress = tryCatch(async (req, res) => {
  const userId = req.user.id;
  const {
    houseNum,
    village,
    road,
    soi,
    district,
    subdistrict,
    province,
    postal,
    detail,
  } = req.body;

  if (
    !houseNum.trim() ||
    !village.trim() ||
    !road.trim() ||
    !soi.trim() ||
    !district.trim() ||
    !subdistrict.trim() ||
    !province.trim() ||
    !postal.trim()
  ) {
    createError(404, "Please provide all address requirement fields.");
  }

  // Find the user and their address
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    createError(404, "User not found");
  }

  // If user doesn't have an address , create a new one
  const updatedAddress = await prisma.address.update({
    where: { userId: userId },
    data: {
      houseNum,
      village,
      road,
      soi,
      district,
      subdistrict,
      province,
      postal,
      detail,
    },
  });

  return res.json({
    message: "Address Update Success",
    address: updatedAddress,
  });
});

module.exports.updateUser = tryCatch(async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, nickname, phone, lineId } = req.body;

  // Validation
  if (!firstName || !lastName || !nickname || !phone || !lineId) {
    createError(400, "Please provide all user fields");
  }

  // Update the user data
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      nickname,
      phone,
      lineId,
    },
  });

  return res.json({ message: "User Update Success", user: updatedUser });
});

module.exports.getMe = tryCatch(async (req, res) => {
  const userId = req.user.id;
  const profile = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!profile) {
    createError(404, "Profile not found");
  }

  res.json({ profile });
});

module.exports.getAllUserData = tryCatch(async (req, res) => {
  const userRole = req.user.role;
  console.log("User Current Role : ", userRole);

  if (userRole !== "ADMIN") {
    createError(401, "Unauthorize");
  }

  const rs = await prisma.user.findMany({
    where: {
      role: { not: "ADMIN" } // Exclude ADMIN users
    }
  });
  
  res.json({ AllUser: rs });
});
