"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import {
  getProfile,
  updatePassword,
  uploadProfilePicture,
} from "@/store/features/user.slice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  HiOutlineMail,
  HiOutlineCake,
  HiOutlineUser,
  HiOutlineIdentification,
  HiOutlineArrowLeft,
  HiOutlineLockClosed,
  HiX,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { RiRocket2Line } from "react-icons/ri";
import Link from "next/link";
import ProfileSkeleton from "@/skeleton/ProfileSkeleton";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userData, isLoading, token } = useAppSelector(
    (state) => state.userReducer,
  );

  const validationSchema = yup.object({
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .required("Password is required"),
    newPassword: yup
      .string()
      .matches(
        passwordRegex,
        "New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .required("Repassword is required"),
  });

  function toggleChangePasswordMode() {
    setChangePasswordMode(!changePasswordMode);
  }
  async function handlePhotoChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const response = await dispatch(uploadProfilePicture(formData));
        if ((response.payload as any)?.success === true) {
          toast.success("Profile picture uploaded successfully");
          dispatch(getProfile());
        }
        console.log("Profile picture uploaded:", response);
      } catch (error) {
        console.error("Profile picture upload failed:", error);
        toast.error("Failed to upload profile picture");
      }
    }
  }
  function triggerUploadPhoto() {
    fileInputRef.current?.click();
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updatePassword(values))
        .then((res: any) => {
          if (res.payload.message === "success") {
            toast.success("Password updated successfully");
            formik.resetForm();
            toggleChangePasswordMode();
          }
        })
        .catch((err: any) => {
          console.error("Password update failed:", err);
        });
    },
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(getProfile());
  }, [dispatch, token, router]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
          <HiOutlineIdentification size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Profile Not Found
        </h2>
        <p className="text-gray-500 max-w-sm mb-8">
          We couldn't retrieve your profile information. Please try signing in
          again.
        </p>
        <Link
          href="/login"
          className="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Banner / Header Background */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[80%] bg-indigo-500/20 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-8">
          <Link
            href="/"
            className="absolute top-8 left-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold"
          >
            <HiOutlineArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/60 overflow-hidden">
          {/* Profile Basic Info Section */}
          <div className="p-8 md:p-12 lg:p-16 border-b border-gray-100/50">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2.2rem] bg-white p-2 shadow-2xl">
                  {userData.photo ? (
                    <img
                      src={userData.photo}
                      alt={userData.name}
                      className="w-full h-full object-cover rounded-[1.8rem]"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-50 to-gray-100 rounded-[1.8rem] flex items-center justify-center text-primary-600">
                      <HiOutlineUser size={80} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={triggerUploadPhoto}
                      className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                    >
                      <FaCamera className="text-primary-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                      {userData.name}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="px-5 py-2.5 bg-gray-50/80 rounded-2xl flex items-center gap-2 text-gray-600 border border-gray-100/50">
                    <HiOutlineMail className="text-primary-500" size={18} />
                    <span className="text-sm font-semibold">
                      {userData.email}
                    </span>
                  </div>
                  <div className="px-5 py-2.5 bg-gray-50/80 rounded-2xl flex items-center gap-2 text-gray-600 border border-gray-100/50">
                    <HiOutlineCake className="text-primary-500" size={18} />
                    <span className="text-sm font-semibold">
                      {new Date(userData.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    toggleChangePasswordMode();
                  }}
                  className="px-8 py-3.5 bg-linear-to-r from-primary-600 to-primary-700 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all active:scale-95"
                >
                  change password
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-50/30">
            {[
              {
                label: "Gender",
                value:
                  userData.gender.charAt(0).toUpperCase() +
                  userData.gender.slice(1),
                icon: HiOutlineUser,
                color: "text-purple-500",
              },
              {
                label: "Join Date",
                value: "January 2026",
                icon: RiRocket2Line,
                color: "text-orange-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-[2rem] border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${item.color}`}
                  >
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-extrabold text-gray-400">
                    {item.label}
                  </span>
                </div>
                <p className="text-gray-900 font-bold truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {changePasswordMode && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={toggleChangePasswordMode}
          ></div>

          {/* Modal Container */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden">
              {/* Header with Gradient */}
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                      <HiOutlineShieldCheck className="text-white" size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Change Password
                      </h2>
                      <p className="text-primary-100 text-sm mt-1">
                        Update your security credentials
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={toggleChangePasswordMode}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-xl flex items-center justify-center transition-all active:scale-95"
                  >
                    <HiX className="text-white" size={20} />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Current Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
                    >
                      Current Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineLockClosed size={20} />
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your current password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="flex items-start gap-2 text-red-600 text-sm animate-slideDown">
                        <span className="mt-0.5">⚠️</span>
                        <span>{formik.errors.password}</span>
                      </div>
                    )}
                  </div>

                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-bold text-gray-700 uppercase tracking-wide"
                    >
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                          <HiOutlineLockClosed size={20} />
                        </div>
                        <input
                          type="password"
                          name="newPassword"
                          id="new-password"
                          placeholder="Enter your new password"
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-primary-500 focus:outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    {formik.touched.newPassword &&
                      formik.errors.newPassword && (
                        <div className="flex items-start gap-2 text-red-600 text-sm animate-slideDown">
                          <span className="mt-0.5">⚠️</span>
                          <span>{formik.errors.newPassword}</span>
                        </div>
                      )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={toggleChangePasswordMode}
                      className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:-translate-y-0.5 transition-all active:scale-95"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handlePhotoChange}
      />
    </div>
  );
}
