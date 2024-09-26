import React from "react";

interface ProfileFormProps {
  email?: string | undefined;
  username?: string | undefined;
  id?: number | undefined;
  role?: string | undefined;
}

const ProfileForm = ({ email, username, id }: ProfileFormProps = {}) => {
  return (
    <form className="flex flex-col space-y-4  [&_input]:p-2 [&_label]:text-sm [&_label]:text-gray-500 [&_div]:border-2 [&_div]:border-gray-300 [&_div]:rounded [&_div]:p-4 ">
      {/* <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" value={id} readOnly />
      </div> */}
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} readOnly />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} readOnly />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <input type="text" id="role" value="Student" readOnly />
      </div>
    </form>
  );
};

export default ProfileForm;
