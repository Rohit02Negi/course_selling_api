const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});

const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  picture: String, // use URL or base64; change to Buffer if storing binary
  creatorId: Schema.Types.ObjectId
});

const PurchaseSchema = new Schema({
  userId: Schema.Types.ObjectId,
  courseId: Schema.Types.ObjectId,
  purchasedAt: { type: Date, default: Date.now }
});


const UserModel = mongoose.model('User', UsersSchema);
const AdminModel = mongoose.model('Admin', AdminSchema);
const CourseModel = mongoose.model('Course', CourseSchema);
const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel
}