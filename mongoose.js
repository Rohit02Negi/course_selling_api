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
  creatorId: Schema.Types.ObjectId,
});

// const PurchaseSchema = new Schema({
//   userId: Schema.Types.ObjectId,
//   courseId: Schema.Types.ObjectId,
//   purchasedAt: { type: Date, default: Date.now }
// });


const purchaseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ⚠️ this name must exactly match the model name
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // ⚠️ must match the Course model name
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});


const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
const UserModel = mongoose.model('User', UsersSchema);
const AdminModel = mongoose.model('Admin', AdminSchema);
const CourseModel = mongoose.model('Course', CourseSchema);
// const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel
}