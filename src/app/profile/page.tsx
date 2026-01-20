"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getProfile, updatePassword } from "@/store/features/user.slice";
import { useEffect, useState } from "react";
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

export default function ProfilePage() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const dispatch = useAppDispatch();
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const { userData, isLoading } = useAppSelector((state) => state.userReducer);

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
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updatePassword(values)).then((res: any) => {
        if(res.payload.message === "success") {
          toast.success("Password updated successfully");
          formik.resetForm();
            toggleChangePasswordMode();
        }
      
      }).catch((err:any)=>{
         console.error("Password update failed:", err);
      });
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

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
          <div className="fixed inset-0 backdrop-blur-md z-50"></div>
          <div className="min-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-xl z-50">
            <div>
              <h1 className="text-2xl font-bold mb-4">Change Password</h1>
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={toggleChangePasswordMode}
              >
                <HiX size={24} />
              </div>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="password flex flex-col gap-2">
                <label htmlFor="password" id="password-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="current password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    * {formik.errors.password}
                  </div>
                )
                 :""}
              </div>
              <div className="new-password flex flex-col gap-2 mt-4">
                <label htmlFor="new-password" id="new-password-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="new-password"
                  className="form-control"
                  placeholder="new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {
                  formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-red-500 text-sm mt-1">
                    * {formik.errors.newPassword}
                  </div>
                ) : ""
                }
                
              </div>
              <button
                type="submit"
                className="mx-auto block mt-6 px-8 py-3.5 bg-linear-to-r from-primary-600 to-primary-700 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all active:scale-95"
              >
                change password
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
