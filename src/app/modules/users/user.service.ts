import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const jwtPayload = {
    name: payload.name,
    email: payload.email,
    role: 'customer',
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '365d',
    },
  );
  return {
    result,
    accessToken,
    refreshToken,
  };
};

const login = async (payload: Partial<TUser>) => {
  //   console.log(payload);
  const isUserExists = await UserModel.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(404, 'User Not Found');
  }

  const passwordMatched = await bcrypt.compare(
    payload.password as string,
    isUserExists.password,
  );
  if (!passwordMatched) {
    throw new AppError(401, 'Unauthorized');
  }

  const jwtPayload = {
    name: isUserExists?.name,
    email: payload.email,
    role: isUserExists?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '365d',
    },
  );

  return {
    accessToken,
    refreshToken,
  };

  //   console.log(isUserExists);
};

const users = async () => {
  const result = await UserModel.find();
  return result;
};

const passwordChange = async (payload: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const email = payload.email;
  const oldPassword = payload.oldPassword;
  const newPassword = payload.newPassword;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const correct = await bcrypt.compare(oldPassword, user?.password);
  if (correct) {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcryptSalt),
    );
    await UserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } },
    );
    return { success: true, message: 'Password Updated Successfully' };
  } else {
    return { success: false, message: 'Old password is incorrect' };
  }
};

const updateUser = async (payload: { id: string }) => {
  
  const id = payload.id;
  console.log(id);

  // Find the user by ID
  const user = await UserModel.findById(id);
  if (!user) {
    console.log('Invalid User');
    return null;
  }

  // Toggle the isBlocked status
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { $set: { isBlocked: !user.isBlocked } },
    { new: true }, // This ensures the function returns the updated document
  );

  return updatedUser;
};

export const UserService = {
  login,
  register,
  users,
  passwordChange,
  updateUser,
};
