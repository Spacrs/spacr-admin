import toast from "react-hot-toast";
const toastHandler = (message) => {
    if (Array.isArray(message) && message.length > 0) {
        message.map((msg) => toast.success(msg));
    }
    else if (typeof message === "string") {
        toast.success(message);
    }
    else {
        toast.error("An error occurred. Please try again later.");
    }
    return true;
};
export default toastHandler;
