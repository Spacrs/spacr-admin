import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, } from "../../store/slices/userSlice/apiSlice";
import { Toaster } from "react-hot-toast";
import errorHandler from "../../_helpers/errorHandler";
import toastHandler from "../../_helpers/toastHandler";
import logo from "../../assets/images/logo.png";
const Authenticate = () => {
    const [user, setUser] = useState({
        secret: "",
    });
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleAuthenticate = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = user;
            const response = await login(userCredentials).unwrap();
            console.log(response);
            if (response.success) {
                localStorage.setItem("access_token", user.secret);
                navigate(`/admin/users`);
                toastHandler(response.message);
            }
        }
        catch (error) {
            errorHandler(error.data.message);
            console.error("Failed to login:", error);
        }
    };
    return (_jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center p-6 dark:bg-[#fbf8f1]", style: { backgroundColor: "#131f5c" }, children: [_jsx(Toaster, {}), _jsx("div", { className: "mb-6", children: _jsx("img", { src: logo, alt: "login_logo", className: "h-24" }) }), _jsx("div", { className: "flex w-full max-w-4xl overflow-hidden rounded-lg bg-[#fbf8f1] shadow-lg dark:bg-white", children: _jsx("div", { className: "w-full p-8 sm:p-12 lg:w-full", children: _jsxs("form", { children: [_jsx("div", { className: "relative mb-6", children: _jsx("input", { type: "password", className: "peer block w-full rounded border-0 bg-gray-200 px-4 py-3 text-gray-700 placeholder-gray-500 dark:bg-gray-100 dark:text-gray dark:placeholder-gray-400", id: "secretPassword1", placeholder: "Admin secret key", onChange: handleChange, name: "secret" }) }), _jsx("button", { type: "submit", onClick: handleAuthenticate, className: "w-full rounded bg-primary py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-dark focus:bg-primary-dark focus:outline-none dark:bg-primary dark:hover:bg-primary", children: isLoading ? "Authenticating..." : "Authenticate" })] }) }) })] }));
};
export default Authenticate;
