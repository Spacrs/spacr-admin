import { Link, useLocation } from "react-router-dom";
import { icons } from "../../Icons/constant";
const {
  HiOutlineDocumentReport,
  HiOutlineUsers,
  CiHome,
  CiSettings,
  RxDashboard,
  IoIosLogOut,
  GrTemplate,
  MdOutlineCategory,
} = icons;
import { logout } from "../../store/slices/userSlice/userSlice";
import { useAppDispatch } from "../../store/hooks";

function Sidebar() {
  const location = useLocation(); // Hook to get current location
  const dispatch = useAppDispatch();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      style={{ width: "300px" }}
      className="h-full flex-col  bg-white text-white hidden md:flex"
    >
      <div className="flex flex-col justify-between flex-grow p-4">
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center p-2 ${
              isActive("/admin/dashboard")
                ? "bg-dark text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <RxDashboard style={{ fontSize: "20px", margin: "0 10px" }} />
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center p-2 ${
              isActive("/admin/users")
                ? "bg-dark text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <HiOutlineUsers style={{ fontSize: "20px", margin: "0 10px" }} />
            Users
          </Link>
          <Link
            to="/admin/template-category"
            className={`flex items-center p-2 ${
              isActive("/admin/template-category")
                ? "bg-dark text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <MdOutlineCategory style={{ fontSize: "20px", margin: "0 10px" }} />
            Template Category
          </Link>
          <Link
            to="/admin/templates"
            className={`flex items-center p-2 ${
              isActive("/admin/templates")
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <GrTemplate style={{ fontSize: "20px", margin: "0 10px" }} />
            Templates
          </Link>
          <Link
            to="/admin/reports"
            className={`flex items-center p-2 ${
              isActive("/admin/reports")
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <HiOutlineDocumentReport
              style={{ fontSize: "20px", margin: "0 10px" }}
            />
            Reports
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center p-2 ${
              isActive("/admin/settings")
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-dark hover:text-white"
            } font-medium rounded-md`}
          >
            <CiSettings style={{ fontSize: "20px", margin: "0 10px" }} />
            Settings
          </Link>
        </nav>
        <div className="mt-6">
          <button
            onClick={() => dispatch(logout())}
            className={`flex items-center p-2 w-full text-primary hover:bg-primary hover:text-white font-medium rounded-md`}
          >
            <IoIosLogOut style={{ fontSize: "20px", margin: "0 10px" }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
