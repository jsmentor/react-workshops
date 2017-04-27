import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  users : [{ type: String, ref: 'User' }]
});

export default mongoose.model('UserGroup', userSchema);