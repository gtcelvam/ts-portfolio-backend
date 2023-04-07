const multer = require("multer");
const profileSchema = require("../modals/profileSchema");
const ProfileSchema = require("../modals/profileSchema");
const { setProfileData, handleProfileData } = require("../utils/helpers");
const ProfileRoute = require("express").Router();
const Upload = multer();

//Add
ProfileRoute.post("/profile", Upload.single("image"), async (req, res) => {
  const profileData = setProfileData(req);
  const profileSchema = new ProfileSchema(profileData);
  try {
    const data = await profileSchema.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//Get
ProfileRoute.get("/profile", async (req, res) => {
  try {
    let profileData = await profileSchema.find();
    const profileInfo = handleProfileData(profileData);
    res.status(200).json(profileInfo);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//Edit
ProfileRoute.patch("/profile/:id", Upload.single("image"), async (req, res) => {
  let id = req.params.id;
  let getProduct = await profileSchema.findById(id);
  if (getProduct) {
    try {
      let fileData;
      let sanitizedData;
      if (req.file) {
        delete getProduct._doc.image;
        fileData = { ...getProduct._doc, ...req.body, ...req.file };
        sanitizedData = setProfileData(fileData);
        let updatedData = await ProfileSchema.replaceOne(
          { _id: id },
          sanitizedData
        );
        res.status(200).json(updatedData);
      } else {
        fileData = { ...getProduct._doc, ...req.body };
        let updatedData = await ProfileSchema.replaceOne({ _id: id }, fileData);
        res.status(200).json(updatedData);
      }
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(404).json({ message: "No product found with this id!" });
  }
});

//Delete
ProfileRoute.delete("/profile/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let deletedData = await profileSchema.findByIdAndDelete(id);
    res.status(200).json(deletedData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = ProfileRoute;
