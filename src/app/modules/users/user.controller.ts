import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';

const handleRegister = catchAsync(async (req, res) => {
  const registerUser = await UserService.register(req.body);

  const { refreshToken, accessToken } = registerUser;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.json({
    success: true,
    message: 'User Created Successfully',
    data: { accessToken },
  });

  //   const { password, student: studentData } = req.body;

  //   const result = await UserServices.createStudentIntoDB(
  //     req.file,
  //     password,
  //     studentData,
  //   );

  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Student is created successfully',
  //     data: result,
  //   });
});

const handleLogin = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(200).json({
    success: true,
    message: 'User is logged in successfully!',
    data: { accessToken },
  });
  // const { refreshToken, accessToken, needsPasswordChange } = result;

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  //   sameSite: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  // });

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User is logged in successfully!',
  //   data: {
  //     accessToken,
  //     needsPasswordChange,
  //   },
  // });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.users();

  res.status(200).json({
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
}); 

const handlePassChange = catchAsync( async(req,res)=>{
   const result = await UserService.passwordChange(req.body);
   res.status(200).json({
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
})

const handleUpdateUser = catchAsync(async(req,res)=>{
  const result = await UserService.updateUser(req.body);
  res.status(200).json({
    success: true,
    message: 'User blocked successfully!',
    data: result,
  });
})

export const UserController = { handleRegister, handleLogin, getAllUser, handlePassChange, handleUpdateUser };
