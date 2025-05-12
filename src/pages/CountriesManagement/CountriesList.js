import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Table from "../../components/Common/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetCountriesQuery } from "../../store/slices/countries/apiSlice";
import { selectCountries, setCountries, } from "../../store/slices/paymentConfigSlice/paymentConfigSlice";
const columns = [
    { name: "name", Header: "Name", colName: "Default" },
    { name: "emoji", Header: "Emogi", colName: "Default" },
    { name: "region", Header: "Region", colName: "Default" },
    { name: "subregion", Header: "Sub Region", colName: "Default" },
    { name: "capital", Header: "Capital", colName: "Default" },
    { name: "phonecode", Header: "Phone Code", colName: "Default" },
    { name: "createdAt", Header: "Created Date", colName: "Date" },
];
const CountriesList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const countries = useAppSelector(selectCountries);
    const [filter, setFilter] = useState(""); // Search term
    const navigate = useNavigate();
    // Fetch country list from API
    const dispatch = useAppDispatch();
    const itemsPerPage = 5;
    const { data, isLoading, isError, refetch } = useGetCountriesQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: filter !== "" ? filter : undefined,
    });
    useEffect(() => {
        if (data?.data) {
            dispatch(setCountries(data.data));
        }
    }, [data, dispatch]);
    if (isError) {
        return (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Error loading payment config data" }));
    }
    const AddCountry = () => {
        // navigate("/admin/add-country");
    };
    const convertEmojiCode = (emojiU) => {
        if (!emojiU)
            return "-";
        try {
            return emojiU
                .split(" ")
                .map((code) => `&#x${code.replace("U+", "").toLowerCase()};`)
                .join(" ");
        }
        catch (error) {
            console.error("Error converting emoji:", error);
            return "-";
        }
    };
    const emojiHtmlEntity = convertEmojiCode("U+1F1EE U+1F1F3");
    return (_jsxs("div", { className: "", children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx("input", { type: "text", className: "w-full px-4 py-2 border border-gray-300 rounded-md", placeholder: "Search Countries...", value: filter, onChange: (e) => setFilter(e.target.value) }) }), _jsx("div", { className: "ml-4" })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto xs:overflow-x-auto", children: _jsx(Table, { data: countries, columns: columns, loading: isLoading, totalPages: data?.pagination?.totalPages || 1, currentPage: currentPage, onPageChange: setCurrentPage, itemsPerPage: itemsPerPage }) })] }));
};
export default CountriesList;
