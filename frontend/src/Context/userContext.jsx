import { Children, createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export default function UserContextProvider({ Children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {Children}
    </UserContext.Provider>
  );
}
