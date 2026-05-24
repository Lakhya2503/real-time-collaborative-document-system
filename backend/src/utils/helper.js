import User from "../module/auth/auth.model.js";

export const secureUser =  async(userId) => {
  return await User.findById(userId).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
}

