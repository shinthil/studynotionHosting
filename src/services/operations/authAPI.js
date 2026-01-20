// import { toast } from "react-hot-toast"

// import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
// import { setUser } from "../../slices/profileSlice"
// import { apiConnector } from "../apiconnector"
// import { endpoints } from "../apis"

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
// } = endpoints

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verify-email")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
      
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       localStorage.setItem("user", JSON.stringify(response.data.user))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }
// }



// export function getPasswordResetToken(email , setEmailSent) {
//   return async(dispatch) => {
//     dispatch(setLoading(true));
//     try{
//       const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

//       console.log("RESET PASSWORD TOKEN RESPONSE....", response);

//       if(!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Reset Email Sent");
//       setEmailSent(true);
//     }
//     catch(error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error("Failed to send email for resetting password");
//     }
//     dispatch(setLoading(false));
//   }
// }

// export function resetPassword(password, confirmPassword, token) {
//   return async(dispatch) => {
//     dispatch(setLoading(true));
//     try{
//       const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

//       console.log("RESET Password RESPONSE ... ", response);


//       if(!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Password has been reset successfully");
//     }
//     catch(error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error("Unable to reset password");
//     }
//     dispatch(setLoading(false));
//   }
// }


import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("Sending OTP to:", email)
      
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        // Remove checkUserPresent: true - let backend handle this
      })
      
      console.log("SENDOTP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      
      // Store email for use in verification page
      localStorage.setItem("signupEmail", email)
      
      // Return success flag - component will handle navigation
      return { 
        success: true, 
        message: "OTP sent successfully",
        email: email
      }
      
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      
      // More specific error messages
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.message.includes("Network Error")) {
        toast.error("Network error. Please check your connection.")
      } else {
        toast.error("Could Not Send OTP")
      }
      
      throw error // Re-throw so component can handle
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("Signing up user:", email)
      
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Signup Successful")
      
      // Return success - component will handle navigation
      return { 
        success: true, 
        message: "Signup successful",
        user: response.data.user
      }
      
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Signup Failed")
      }
      
      throw error
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function login(email, password) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("Logging in user:", email)
      
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      
      // Set token and user data
      dispatch(setToken(response.data.token))
      
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      // Store in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
      // Return success - component will handle navigation
      return { 
        success: true, 
        message: "Login successful",
        token: response.data.token,
        user: response.data.user
      }
      
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.message.includes("Network Error")) {
        toast.error("Network error. Please check your connection.")
      } else if (error.message.includes("401")) {
        toast.error("Invalid email or password")
      } else {
        toast.error("Login Failed")
      }
      
      throw error
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function logout() {
  return (dispatch) => {
    try {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("signupEmail") // Clean up OTP email too
      
      toast.success("Logged Out")
      
      // Return success - component will handle navigation
      return { success: true, message: "Logged out successfully" }
      
    } catch (error) {
      console.log("LOGOUT ERROR............", error)
      toast.error("Logout failed")
      throw error
    }
  }
}

export function getPasswordResetToken(email) {
  return async(dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Sending reset email...")
    
    try {
      console.log("Requesting password reset for:", email)
      
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response)

      if(!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      
      return { 
        success: true, 
        message: "Reset email sent",
        emailSent: true
      }
      
    } catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Failed to send reset email")
      }
      
      throw error
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Resetting password...")
    
    try {
      console.log("Resetting password with token")
      
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password, 
        confirmPassword, 
        token
      })

      console.log("RESET Password RESPONSE ... ", response)

      if(!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password has been reset successfully")
      
      return { 
        success: true, 
        message: "Password reset successful"
      }
      
    } catch(error) {
      console.log("RESET PASSWORD Error", error)
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Unable to reset password")
      }
      
      throw error
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}