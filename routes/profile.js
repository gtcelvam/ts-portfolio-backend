const Mongoose = require("mongoose");
const multer = require("multer");
const profileSchema = require("../modals/profileSchema");
const ProfileSchema = require("../modals/profileSchema");
const ProfileRoute = require("express").Router();
const Upload = multer();

ProfileRoute.post("/profile", Upload.single("image"), async (req, res) => {
  const uniqueId = new Mongoose.Types.ObjectId();
  const extension = req.file.mimetype.split("/")[1];
  const profileData = {
    name: req.body.name,
    role: req.body.role,
    image: {
      name: uniqueId,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  };
  const profileSchema = new ProfileSchema(profileData);
  try {
    const data = await profileSchema.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

ProfileRoute.delete("/profile/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let deletedData = await profileSchema.findByIdAndDelete(id);
    res.status(200).json(deletedData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

ProfileRoute.get("/profile", async (req, res) => {
  try {
    let profileData = await profileSchema.find();
    const bufferData = profileData[0].image.data;
    const buffer = Buffer.from(bufferData);
    const base64String = buffer.toString('base64');
    const contentType = profileData[0].image.contentType;
    const url = `data:${contentType};base64,${base64String}`;
    const profileInfo = {
      name: profileData[0].name,
      role: profileData[0].role,
      url : url
    }
    res.status(200).json(profileInfo);
  } catch (error) {
    res.status(404).json({ message: error });
  }

});

module.exports = ProfileRoute;
