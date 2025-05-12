import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetCitiesQuery } from "../../store/slices/paymentConfigSlice/apiSlice";
import { selectCities, setCities, } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
import { Tooltip } from "@material-tailwind/react";
import { columns } from "../../constant/Columns";
import { Search, Table, Button } from "../../components/Common";
const CityList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cities = useAppSelector(selectCities);
    const navigate = useNavigate();
    // Fetch country list from API
    const dispatch = useAppDispatch();
    const itemsPerPage = 10;
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    const [filter, setFilter] = useState(""); // Search term
    const { data, isLoading, isFetching, isError } = useGetCitiesQuery({
        page: currentPage,
        limit: itemsPerPage,
        sort: sortDirection,
        sortBy: sortBy,
        search: filter !== "" ? filter : undefined,
    });
    useEffect(() => {
        if (data?.data) {
            dispatch(setCities(data.data));
        }
    }, [data, dispatch]);
    if (isError) {
        return (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Error loading payment config data" }));
    }
    const AddCity = () => {
        navigate("/admin/add-city");
    };
    const onSort = (colName, direction) => {
        setSortBy(colName);
        setSortDirection(direction);
    };
    const onSearch = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
    };
    const handleUpdate = (config) => {
        navigate(`/admin/edit-city/${config.Id}`);
    };
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: onSearch, onReset: () => setFilter("") }) }), _jsx("div", { className: "ml-4", children: _jsx(Tooltip, { content: "Material Tailwind", children: _jsx(Button, { text: "Add City", className: "", variant: "lightBlue", onClick: AddCity }) }) })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: cities, columns: columns.city, loading: isLoading || isFetching, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, itemsPerPage: itemsPerPage, handleUpdate: handleUpdate, onSort: onSort }) })] }));
};
export default CityList;
