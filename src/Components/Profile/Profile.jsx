import React, { useContext } from "react";

import { UserContext } from "../Context/UserContextProvider";

export default function Profile() {
    const { user } = useContext(UserContext);

    console.log("i", user);
    // console.log(user.user.name);

    return (
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome, {user?.name}!</h1>
        <p className="welcome-title">Here is Your To Do App 😄</p>
      </div>
    );
}
