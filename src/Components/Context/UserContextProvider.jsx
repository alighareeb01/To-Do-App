import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  let [token, setToken] = useState("");
  let [user, setUser] = useState(null);

  useEffect(() => {
    let tokenStored = localStorage.getItem("userToken");
    if (tokenStored) setToken(tokenStored);

    let userStored = localStorage.getItem("userData");
    if (userStored) setUser(JSON.parse(userStored));
  }, []);
  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
