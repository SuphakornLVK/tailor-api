const prisma = require("../models");
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    firstName: "Andy",
    lastName: "Codecampe",
	username: "Andy",
    password: hashedPassword,
    nickname: "Ann",
    phone: "2222222222",
    lineId: "Andyza",
  },
  {
    firstName: "Bobby",
    lastName: "Codecampe",
	username: "Bobby",
    password: hashedPassword,
    nickname: "Bob",
    phone: "0000000000",
    lineId: "Bobbo",
  },
  {
    firstName: "Candy",
    lastName: "Codecampe",
	username: "Candy",
    password: hashedPassword,
    nickname: "Candy",
    phone: "1111111111",
    lineId: "Candocandy",
  },
  {
    firstName: "Danny",
    lastName: "Codecampe",
	username: "Danny",
    password: hashedPassword,
    nickname: "Dan",
    phone: "1234567890",
    lineId: "Dannado",
  },
  {
    firstName: "Robert",
    lastName: "Codecampe",
	username: "Robert",
    password: hashedPassword,
    nickname: "Bob",
    phone: "0987654321",
    lineId: "Bob123",
  },
];

const addressData = [
  {
    userId: 1,
    houseNum: "123",
    village: "Village A",
	road: "ABC",
    soi: "Soi 1",
    district: "District A",
    subdistrict: "Subdistrict A",
    province: "Province A",
    postal: "10100",
  },
  {
    userId: 2,
    houseNum: "456",
    village: "Village B",
	road: "ABC",
    soi: "Soi 2",
    district: "District B",
    subdistrict: "Subdistrict B",
    province: "Province B",
    postal: "10200",
  },
  {
    userId: 3,
    houseNum: "789",
    village: "Village C",
	road: "ABC",
    soi: "Soi 3",
    district: "District C",
    subdistrict: "Subdistrict C",
    province: "Province C",
    postal: "10300",
  },
  {
    userId: 4,
    houseNum: "101",
    village: "Village D",
	road: "ABC",
    soi: "Soi 4",
    district: "District D",
    subdistrict: "Subdistrict D",
    province: "Province D",
    postal: "10400",
  },
  {
    userId: 5,
    houseNum: "202",
    village: "Village E",
	road: "ABC",
    soi: "Soi 5",
    district: "District E",
    subdistrict: "Subdistrict E",
    province: "Province E",
    postal: "10500",
  },
];

const jobData = [
    {
        name: "Suit jacket",
        type: "PRODUCT",
        description: "A custom suit tailored to an individual's body shape and preferences.",
        price: "3000",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741026263/Suit_Jacket_lrvwwk.jpg"
    },
    {
        name: "Dress",
        type: "PRODUCT",
        description: "A skilled craft dress from fabric, patterns, and techniques to fit the unique shape and preferences of the wearer.",
        price: "2000",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741224698/1_871d6045-82d0-4209-b464-46ce51a4c7f3_r6plbs.jpg"
    },
    {
        name: "Suit pant",
        type: "PRODUCT",
        description: "Suit pants made from the same material as the suit jacket and are designed to be worn together.",
        price: "2000",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741029798/Suit_pant_njd9u2.jpg"
    },
    {
        name: "Jean",
        type: "PRODUCT",
        description: "Jeans are one of the most versatile and widely worn types of clothing worldwide. ",
        price: "500",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038046/Jean_dbbewx.jpg"
    },
    {
        name: "Student T-shirt",
        type: "PRODUCT",
        description: "A student t-shirt is a versatile and popular piece of clothing worn by students of all ages.",
        price: "1000",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038475/Student_Shirt_ne7oj8.jpg"
    },
    {
        name: "Student Pant",
        type: "PRODUCT",
        description: "A student Pant is a versatile and popular piece of clothing worn by students of all ages.",
        price: "800",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038475/Student_pant_bwwaif.jpg"
    },
    {
        name: "Student Skirt",
        type: "PRODUCT",
        description: "A student Skirt is a versatile and popular piece of clothing worn by students of all ages.",
        price: "700",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038475/Student_skirt_tfqit5.jpg"
    },
    {
        name: "T-shirt",
        type: "PRODUCT",
        description: "A t-shirt is one of the most universally recognized and comfortable garments.",
        price: "600",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038583/T-shirt_spnmyb.webp"
    },
    {
        name: "Short",
        type: "PRODUCT",
        description: "Shorts are a popular piece of clothing, especially during warm weather, offering comfort, breathability.",
        price: "500",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741038584/Short_o5trs3.jpg"
    },
    {
        name: "zipper changing",
        type: "SERVICE",
        description: "zipper-change",
        price: "150",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741224698/depositphotos_2794205-stock-photo-zip-fastener_s2oh2j.webp"
    },
    {
        name: "cloth fix",
        type: "SERVICE",
        description: "fix your favorite cloth",
        price: "300",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741224698/maxresdefault_r5xgqa.jpg"
    },
    {
        name: "shirt resizing",
        type: "SERVICE",
        description: "shirt resizing",
        price: "400",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741224698/1634021934936_vswagx.jpg"
    },
    {
        name: "pant resizing",
        type: "SERVICE",
        description: "pant resizing",
        price: "300",
        productImage: "https://res.cloudinary.com/djvbzeeow/image/upload/v1741224697/00001_zt3d8s.jpg"
    },
]

console.log("DB seed...");

async function seedDB() {
  await prisma.user.createMany({ data: userData });
  await prisma.address.createMany({ data: addressData });
  await prisma.product.createMany({ data: jobData });
}


seedDB();

// npx prisma db seed
