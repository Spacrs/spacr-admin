import Header from "../../components/AdminLayout/Header";
import MainContent from "../../components/AdminLayout/MainContent";
import Sidebar from "../../components/AdminLayout/Sidebar";
import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "../../routes/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { icons } from "../../Icons/constant";
import { updateLayout } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
const { RiExpandRightLine } = icons;

function AdminLayout() {
  const layout = useAppSelector((state) => state.adminLayoutSlice.layout);
  const dispatch = useAppDispatch();

  return (
    <div className="h-screen bg-slate-100">
      {layout?.showHeader && <Header />}
      <div
        style={{ height: layout?.showHeader ? "calc(100% - 70px)" : "100%" }}
        className="w-screen flex"
      >
        {layout?.showLeftSidebar ? (
          <Sidebar />
        ) : (
          <RiExpandRightLine
            className="text-primary bg-lightBlue rounded-full cursor-pointer"
            style={{
              fontSize: "12px",
              padding: "5px",
              width: "25px",
              height: "25px",
            }}
            onClick={() =>
              dispatch(
                updateLayout({ showLeftSidebar: !layout?.showLeftSidebar })
              )
            }
          />
        )}
        <Routes>
          {adminRoutes.map(
            ({ path, breadcrumb, showBreadcrumb, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <MainContent
                    path={path}
                    breadcrumb={breadcrumb}
                    showBreadcrumb={showBreadcrumb}
                  >
                    <Component />
                  </MainContent>
                }
              />
            )
          )}
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
