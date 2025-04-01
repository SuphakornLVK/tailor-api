const prisma = require("../models");

const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");

// for ADMIN only
module.exports.getAllOrder = tryCatch(async (req, res, next) => {
  const userRole = req.user.role;

  if (userRole !== "ADMIN") {
    createError(401, "Unauthorize");
  }

  const rs = await prisma.order.findMany({
    include: {
      User: { select: { id: true, firstName: true, lastName: true}},
      Product: { select: { name: true, price: true }},
    },
  });

  res.json({ orders: rs });
});

// for User to get every order, product name and price included
module.exports.UserAllOrder = tryCatch(async (req, res, next) => {
  const userId = req.user.id;

  if (!req.user || !userId) {
    createError(401, "User not authenticated");
  }

  const rs = await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: {
      Product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  res.json({ orders: rs });
});

module.exports.createOrder = tryCatch(async (req, res, next) => {
  const { appointment, userId, productId } = req.body;
  // validation
  if (!appointment || !userId || !productId){
    createError(400, "All data require")
  }
  const newOrder ={
    appointment: appointment,
    userId: userId,
    productId: productId
  }
  const rs = await prisma.order.create({data: newOrder})
  console.log(rs);
  
  res.json({ msg: "Order Created", order: rs})
});

module.exports.updateOrderStatus = tryCatch(async (req, res, next) => {
  const { orderId, status } = req.body;
  
  console.log("Received Data:", req.body); // Debug log
  
  if (!orderId || !status) {
    return next(createError(400, "Missing orderId or status"));
  }

  const updatedOrder = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status },
  });

  console.log("Updated Order:", updatedOrder); // Debug log
  
  res.json({ msg: "Order status updated", order: updatedOrder });
});
