import { useEffect } from "react";
import { updateLayout, } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
import { useAppDispatch } from "../../store/hooks";
const ResponsiveComponent = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (window.innerWidth <= 767) {
            dispatch(updateLayout({ showLeftSidebar: false }));
        }
    }, [window.innerWidth]);
    useEffect(() => {
        const handleResize = () => {
            dispatch(updateLayout({ mainContentWidth: window.innerWidth }));
        };
        // Add event listener to listen for window resize events
        window.addEventListener("resize", handleResize);
        // Cleanup function to remove event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array to run only once on mount
    return "";
};
export default ResponsiveComponent;
