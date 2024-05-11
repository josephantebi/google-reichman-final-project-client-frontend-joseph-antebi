import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState, createContext } from "react";
import toast from "react-hot-toast";
import { useLogInUser } from "../Providers/log-in-user-provider";

function GoogleAuth() {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  // const [currentUser, setCurrentUser] = useState({});

  const { currentUser, setCurrentUser } = useLogInUser();

  const handleSeccess = async (credentialResponse) => {
    const response = await fetch(`/users/google`, {
      method: "POST",
      body: JSON.stringify(credentialResponse),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      toast.error("Something went wrong");
    }

    const data = await response.json();
    setCurrentUser(data);
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSeccess(credentialResponse);
          toast.success("Login Successful");
        }}
        onError={() => toast.error("Error")}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
