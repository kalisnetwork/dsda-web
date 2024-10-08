import User from '../models/User.js';
import { AppError } from '../utils/error.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(new AppError('Error fetching users', 500));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return next(new AppError('User not found', 404));
    res.json(user);
  } catch (err) {
    next(new AppError('Error fetching user', 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!user) return next(new AppError('User not found', 404));
    res.json(user);
  } catch (err) {
    next(new AppError('Error updating user', 400));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError('User not found', 404));
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(new AppError('Error deleting user', 500));
  }
};
