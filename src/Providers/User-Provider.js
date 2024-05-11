import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/users`);
      setUsers(await response.json());
    } catch {
      toast.success("There was an error while fetching users from the server");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    fetchUser,
    users,
    setUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
