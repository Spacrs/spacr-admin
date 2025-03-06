import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/slices/userSlice/apiSlice";
import { Toaster } from "react-hot-toast";
import errorHandler from "../../_helpers/errorHandler";
import toastHandler from "../../_helpers/toastHandler";

interface LoginRequest {
  secret: string;
}

const Authenticate: React.FC = (): React.ReactElement => {
  const [user, setUser] = useState<LoginRequest>({
    secret: "",
  });

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAuthenticate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userCredentials: LoginRequest = user;
      const response = await login(userCredentials).unwrap();

      console.log(response)
      if (response.success) {
        localStorage.setItem("access_token", user.secret);
        navigate(`/admin/users`);
        toastHandler(response.message);
      }
    } catch (error: any) {
      errorHandler(error.data.message);
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 dark:bg-[#fbf8f1]">
      <Toaster />
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-[#fbf8f1] shadow-lg dark:bg-white">
        <div className="w-full p-8 sm:p-12 lg:w-full">
          <form>
            <div className="relative mb-6">
              <input
                type="password"
                className="peer block w-full rounded border-0 bg-gray-100 px-4 py-3 text-gray-700 placeholder-gray-500  dark:bg-gray-100 dark:text-gray dark:placeholder-gray-400"
                id="secretPassword1"
                placeholder="Admin secret key"
                onChange={handleChange}
                name="secret"
              />
            </div>
            <button
              type="submit"
              onClick={handleAuthenticate}
              className="w-full rounded bg-primary py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-dark focus:bg-primary-dark focus:outline-none dark:bg-primary dark:hover:bg-primary"
            >
              {isLoading ? "Authenticating..." : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
