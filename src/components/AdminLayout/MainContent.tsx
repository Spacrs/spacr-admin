import React from "react";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { selectLayout } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
import { useAppSelector } from "../../store/hooks";
import ResponsiveComponent from "./ResponsiveComponent";

function MainContent({
  children,
  path,
  breadcrumb,
  showBreadcrumb = false,
}: {
  children: React.ReactElement;
  path: string;
  breadcrumb: string[];
  showBreadcrumb?: Boolean;
}) {
  const { showLeftSidebar } = useAppSelector(selectLayout);

  return showBreadcrumb ? (
    <div style={{ width: "100%" }} className="h-full flex-col bg-white">
      <div className="h-full w-full flex-col overflow-y-scroll rounded-md bg-gray-200 p-2">
        {breadcrumb && <Breadcrumb title={path} breadcrumb={breadcrumb} />}
        <ResponsiveComponent />
        {children}
      </div>
    </div>
  ) : (
    children
  );
}

export default MainContent;
