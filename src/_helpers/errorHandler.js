import toast from "react-hot-toast";
const errorHandler = (message) => {
    if (Array.isArray(message) && message.length > 0) {
        message.map((msg) => toast.error(msg));
    }
    else if (typeof message === "string") {
        toast.error(message);
    }
    else if (typeof message === "object" && Object.keys(message) && message?.name && message?.name?.message) {
        console.log(message.name.message);
        toast.error(message.name.message);
    }
    else {
        toast.error("An error occurred. Please try again later.");
    }
    return true;
};
export default errorHandler;
