import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import { useAppSelector } from "../../store/hooks";
import { Table, Button, Search } from "../../components/Common";
const columns = [
    { name: "Name", Header: "Name", colName: "Default" },
    { name: "Mobile Number", Header: "Mobile Number", colName: "Default" },
    { name: "Email", Header: "Email", colName: "Default" },
    { name: "Message", Header: "Message", colName: "Default" },
    {
        name: "CreatedAt",
        Header: "Created At",
        colName: "DateAndTime",
        sortable: true,
    },
    {
        name: "UpdatedAt",
        Header: "Updated At",
        colName: "DateAndTime",
        sortable: true,
    },
];
function ContactSupportList() {
    const { users } = useAppSelector((state) => state.userSlice);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetUsersQuery({});
    const onClick = () => { };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    return (_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsx("div", { className: "ml-4", children: _jsx(Button, { variant: "lightBlue", onClick: onClick, text: "Refresh" }) })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: users, columns: columns, loading: isLoading, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage }) })] }));
}
export default ContactSupportList;
