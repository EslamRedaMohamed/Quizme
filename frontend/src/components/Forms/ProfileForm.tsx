
import React from "react";

interface ProfileFormProps {
  email?: string | undefined;
  username?: string | undefined;
  id?: number | undefined;
  role?: string | undefined;
  category?: string | undefined;
}

const ProfileForm = ({
  email,
  username,
  id,
  role,
  category,
}: ProfileFormProps = {}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden -mt-40">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-r from-emerald-500 to-white-400 p-6 flex flex-col justify-center items-center text-white">
            <img
              src="https://img.icons8.com/bubbles/100/000000/user.png"
              alt="User"
              className="rounded-full mb-4"
            />
            <h6 className="text-xl font-semibold">{username}</h6>
            <p className="text-sm">{role || "Instructor"}</p>
          </div>
          <div className="md:w-2/3 p-8">
            <h6 className="text-2xl font-semibold mb-6">Information</h6>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <p className="text-lg font-medium mb-2">Email</p>
                <h6 className="text-gray-500">{email || "Instructorg@gmail.com"}</h6>
              </div>

              <div>
                <p className="text-lg font-medium mb-2">Role</p>
                <h6 className="text-gray-500">{role || "Instructor"}</h6>
              </div>

              <div className="col-span-2">
                <div className="h-8"></div> 
              </div>

              <div>
                <p className="text-lg font-medium mb-2">Category</p>
                <h6 className="text-gray-500">{category || "ITI"}</h6>
              </div>

              <div>
                <p className="text-lg font-medium mb-2">Username</p>
                <h6 className="text-gray-500">{username || "Instructor"}</h6>
              </div>
            </div>

            <ul className="flex mt-8 space-x-4">
              <li>
                <a href="#!" className="text-blue-500 hover:text-blue-700">
                  <i className="mdi mdi-facebook feather icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="text-blue-400 hover:text-blue-600">
                  <i className="mdi mdi-twitter feather icon-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#!" className="text-pink-500 hover:text-pink-700">
                  <i className="mdi mdi-instagram feather icon-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
