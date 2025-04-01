const prisma = require("../models");
const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");

module.exports.updateUserMeasure = tryCatch(async (req, res, next) => {
    const { userId } = req.params;
    const updateData = req.body;


    const existingMeasure = await prisma.measurement.findUnique({
        where: { userId : Number(userId)}
    });

    if (!existingMeasure) {
        return next(createError(404, "Measurement data not found"));
    }

    const updatedMeasure = await prisma.measurement.update({
        where: { userId : Number(userId) },
        data: {
            ...existingMeasure,
            ...updateData
        }
    });

    res.json({ success: true, message: "Measurement data updated", data: updatedMeasure });

});

module.exports.getUserMeasure = tryCatch(async (req, res, next) => {
    const { userId } = req.params;

    const measurement = await prisma.measurement.findFirst({
        where: { userId: Number(userId) },
        include: {
            User: {
                select: { nickname: true }
            }
        }
    });

    if (!measurement) {
        return res.json({ success: false, message: "No measurement data found" });
    }

    res.status(200).json({ success: true, data: measurement });

});
