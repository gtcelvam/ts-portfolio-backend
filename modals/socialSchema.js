const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const SocialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('socail_links', SocialSchema);
