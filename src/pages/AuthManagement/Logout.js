import { useEffect } from "react";
import { logout } from "../../store/slices/userSlice/userSlice";
import { useAppDispatch } from "../../store/hooks";
function Logout() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(logout());
    }, []);
    return "";
}
export default Logout;
