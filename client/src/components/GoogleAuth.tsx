import { useState } from "react";

import axios, { AxiosResponse } from "axios";
import GoogleLogin from "react-google-login";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const onSucces = async (res: any) => {
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:4000/auth",
        {
          token: res?.tokenId,
        }
      );
      setUser(result.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      {!user && (
        <GoogleLogin
          // clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          clientId={
            "626551036425-f50suotaha8unhj069cu4b35jjvvbkaa.apps.googleusercontent.com"
          }
          onSuccess={onSucces}
        />
      )}

      {user && (
        <>
          <img src={user.avatar} alt="userAvatar" className="rounded-full" />
          <h1 className="text-xl font-semibold text-center my-5">
            {user.name}
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
