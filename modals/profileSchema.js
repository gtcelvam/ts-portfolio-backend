const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');


let Schema = Mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const ProfileSchema = new Schema({
    name: String,
    role: String,
    image: {
        name: ObjectId,
        data: Buffer,
        contentType: String
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('profile',ProfileSchema);
