import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RevenueCard from "../../components/Common/Cards/RevenueCard";
import SellingProductCard from "../../components/Common/Cards/SellingProductCard";
import StatCard from "../../components/Common/Cards/StatCard";
import Loading from "../../components/Common/Loader/index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/slices/userSlice/apiSlice";
const statCardsdata = [
    {
        title: "Templates",
        value: "$302.1K",
        change: "▼ 2.9% vs $303.3K last year",
        changeType: "down",
    },
    {
        title: "Templates Utilizers",
        value: "12,900",
        change: "▲ 12.9% vs 10,300 last year",
        changeType: "up",
    },
    {
        title: "Earning",
        value: "390,040",
        change: "▲ 4.1% vs 320,583 last year",
        changeType: "up",
    },
    {
        title: "Visitor",
        value: "3.1M",
        change: "▼ 17% vs 3.3M last year",
        changeType: "down",
    },
];
function Dashboard() {
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { data, isLoading, isError } = useGetUserQuery(user?.user?._id, {
        skip: !user?.user?._id,
    });
    // useEffect(() => {
    //   if (data) {
    //     dispatch(getLoggedInUser(data.user));
    //   }
    // }, [data, dispatch]);
    const userState = useAppSelector((state) => state.userSlice);
    if (isLoading)
        return _jsx(Loading, {});
    if (isError)
        return _jsx("div", { children: "Error loading user data" });
    return (_jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "mb-4 flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold", children: ["Welcome back, ", userState.user.name] }), _jsx("p", { className: "text-gray-600", children: "Maximize product sales and store management in order to get the best results" })] }), _jsx("div", { className: "flex justify-between items-center mb-4", children: _jsxs("div", { children: [_jsx("button", { className: "px-4 py-2 bg-gray-100 rounded-md", children: "This Month" }), _jsx("button", { className: "px-4 py-2 bg-black text-white rounded-md", children: "Download Report" })] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4", children: statCardsdata.map((card, index) => {
                    return (_jsx(StatCard, { title: card.title, value: card.value, change: card.change, changeType: card.changeType }, index));
                }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [_jsx(RevenueCard, {}), _jsx(SellingProductCard, {})] })] }));
}
export default Dashboard;
