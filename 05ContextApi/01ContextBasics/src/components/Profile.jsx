import React, { useContext } from "react";
import UserContext from "../context/userContext/UserContext";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  // console.log(userDetails)
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-slate-500 p-10 rounded-lg">
        {userDetails.username ? (
          <div>
            <p className="text-3xl font-serif font-bold">
              Your Username:{" "}
              <span className="text-white underline">
                {userDetails.username}
              </span>
            </p>
            <p className="text-3xl font-serif font-bold">
              Your Password:{" "}
              <span className="text-white underline">
                {userDetails.password}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-3xl font-bold">Enter Details First!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
