import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../constants/apiEndpoints";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
function ReportDetails() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("users");
    const [reportsData, setReportsData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const res = await fetch(API.ADMIN.REPORTS, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                const result = await res.json();
                console.log("Reports API Response:", result);
                if (res.ok && result.success) {
                    console.log("Fetched Reports Data:", result.data);
                    setReportsData(result.data);
                }
                else {
                    console.error(result.message || "Failed to fetch reports");
                }
            }
            catch (error) {
                console.error(error.message || "Error fetching reports");
            }
            finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);
    const reportTabs = [
        {
            label: "Today's Registered Users",
            key: "users",
            count: reportsData?.userRegistrationCount || 0,
            route: "/admin/users",
        },
        {
            label: "Today's Trip Created",
            key: "trips",
            count: reportsData?.tripsCount || 0,
            route: "/admin/travel-listing",
        },
        {
            label: "Today's Live Orders",
            key: "liveOrders",
            count: reportsData?.liveOrderCount || 0,
            route: "/admin/order-list",
        },
        {
            label: "Today's Cancelled Orders",
            key: "cancelledOrders",
            count: reportsData?.cancelledOrderCount || 0,
            route: "/admin/order-list?status=cancelled",
        },
        {
            label: "Today's Accepted Orders",
            key: "acceptedOrders",
            count: reportsData?.acceptedOrderCount || 0,
            route: "/admin/order-list?status=accepted",
        },
        {
            label: "Today's Delivered Orders",
            key: "deliveredOrders",
            count: reportsData?.deliveredOrderCount || 0,
            route: "/admin/order-list?status=delivered",
        },
        {
            label: "Today's Purchase Orders",
            key: "purchaseOrders",
            count: reportsData?.purchasedOrderCount || 0,
            route: "/admin/order-list?type=purchase",
        },
        {
            label: "Today's Ready To Receive Orders",
            key: "readyOrders",
            count: reportsData?.readyToReceiveOrderCount || 0,
            route: "/admin/order-list?status=ready",
        },
    ];
    const handleTabClick = (tab) => {
        setActiveTab(tab.key);
        if (tab.count === 0) {
            toast.error(`No ${tab.label.replace("Today's ", "")} found today`);
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (tab.key === "users") {
            navigate(`/admin/users?fromDate=${today}&toDate=${today}`);
        }
        else if (tab.key === "trips") {
            navigate(`${tab.route}?fromDate=${today}&toDate=${today}`);
        }
        else {
            navigate(tab.route);
        }
    };
    if (loading) {
        return _jsx("div", { className: "p-4", children: "Loading reports..." });
    }
    return (
    // <div className="p-4">
    //   {/* <h1 className="text-xl font-bold mb-4">Report Details</h1> */}
    //   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    //     {reportTabs.map((tab) => (
    //       <div
    //         key={tab.key}
    //         onClick={() => handleTabClick(tab)}
    //         className={`cursor-pointer p-4 rounded-xl shadow-md transition-all
    //           ${
    //             activeTab === tab.key
    //               ? "bg-primary text-white"
    //               : "bg-white hover:bg-gray-100"
    //           }`}
    //       >
    //         <h2 className="text-sm font-medium">{tab.label}</h2>
    //         <p className="text-2xl font-bold mt-2">{tab.count}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    _jsxs("div", { className: "p-4", children: [_jsx(ToastContainer, {}), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: reportTabs.map((tab) => (_jsxs("div", { onClick: () => !loading && handleTabClick(tab), className: `group cursor-pointer p-4 rounded-xl shadow-md transition-all
              flex flex-col justify-between
              ${activeTab === tab.key
                        ? "bg-primary text-white"
                        : "bg-white hover:bg-gray-100"} ${loading ? "pointer-events-none opacity-70" : ""}`, children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-medium", children: tab.label }), loading ? (_jsx("div", { className: "mt-2 h-6 w-12 bg-gray-300 rounded animate-pulse" })) : (_jsx("p", { className: "text-2xl font-bold mt-2", children: tab.count }))] }), _jsx("div", { className: "flex justify-end mt-2", children: _jsx(FiArrowRight, { className: `text-lg transition-transform duration-200
                  ${activeTab === tab.key
                                    ? "text-white"
                                    : "text-gray-500 group-hover:translate-x-1"}` }) })] }, tab.key))) })] }));
}
export default ReportDetails;
