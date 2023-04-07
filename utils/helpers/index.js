const Mongoose = require("mongoose");

const setProfileData = (data) => {
  const uniqueId = new Mongoose.Types.ObjectId();
  return {
    name: data.body?.name ? data.body.name : data.name,
    role: data.body?.role ? data.body.role : data.role,
    image: {
      name: uniqueId,
      data: data?.file ? data.file.buffer : data.buffer,
      contentType: data?.file ? data.file.mimetype : data.mimetype
    },
  };
};

const handleProfileData = (data) => {
  const bufferData = data[0].image.data;
  const buffer = Buffer.from(bufferData);
  const base64String = buffer.toString("base64");
  const contentType = data[0].image.contentType;
  const url = `data:${contentType};base64,${base64String}`;
  return {
    id: data[0]._id,
    name: data[0].name,
    role: data[0].role,
    url: url,
  };
};

module.exports = { setProfileData, handleProfileData };
