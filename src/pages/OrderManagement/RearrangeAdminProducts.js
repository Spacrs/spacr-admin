import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProducts } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { Search, Button } from "../../components/Common";
import { useSelector } from 'react-redux';
function RearrangeAdminProducts() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useAppSelector((state) => state.orderSlice.products);
    const state = useSelector((state) => state);
    console.log("stateeee", state);
    const [filter, setFilter] = useState("");
    const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery({
        page: 1, // No pagination
        limit: 100, // Get all records
        createdBy: "admin",
        search: filter || undefined,
    });
    useEffect(() => {
        if (data?.data) {
            const formattedProducts = data.data.map((product) => ({
                ...product,
                image: product.medias?.[0]?.url || "",
            }));
            dispatch(setProducts(formattedProducts));
        }
    }, [data, dispatch]);
    useEffect(() => {
        refetch();
        return () => {
            dispatch(setProducts([]));
        };
    }, [refetch, dispatch]);
    if (isError)
        return _jsx("div", { className: "p-4 bg-red-500 text-white rounded-lg", children: "Error loading orders" });
    const handleDragStart = (e, product) => {
        e.dataTransfer.setData("product", JSON.stringify(product));
    };
    const handleDrop = async (e, index) => {
        const draggedProduct = JSON.parse(e.dataTransfer.getData("product"));
        const updatedProducts = [...products];
        const draggedIndex = updatedProducts.findIndex((item) => item.Id === draggedProduct.Id);
        if (draggedIndex === -1)
            return;
        // Rearranging the list
        updatedProducts.splice(draggedIndex, 1);
        updatedProducts.splice(index, 0, draggedProduct);
        // Assign new listOrder
        const productsWithOrder = updatedProducts.map((product, i) => ({
            ...product,
            listOrder: i + 1,
        }));
        dispatch(setProducts(productsWithOrder)); // Update Redux state
        // Update in DB
        try {
            let token = localStorage.getItem('access_token');
            await fetch("https://api-v2.spa-cr.com/api/v2/admin/reorder-suggested-products", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productsWithOrder.map(p => ({
                    Id: p.Id,
                    ListOrder: p.listOrder,
                }))),
            });
        }
        catch (err) {
            console.error("Error updating order", err);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault(); // Allow the drop event
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg", children: [_jsx("div", { className: "flex flex-1 max-w-lg", children: _jsx(Search, { search: filter, onChange: (e) => {
                                setFilter(e.target.value);
                            }, placeholder: "Search by name...", onReset: () => setFilter("") }) }), _jsx("div", { className: "ml-4", children: _jsx(Button, { text: "Go Back", className: "mr-2", variant: "dark", type: "button", onClick: () => navigate("/admin/suggested-product-list") }) })] }), _jsx("div", { className: "flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 border-b text-left", children: "S.No" }), _jsx("th", { className: "px-4 py-2 border-b text-left", children: "Image" }), _jsx("th", { className: "px-4 py-2 border-b text-left", children: "Product Name" }), _jsx("th", { className: "px-4 py-2 border-b text-left", children: "Is Trending" }), _jsx("th", { className: "px-4 py-2 border-b text-left", children: "Created At" }), _jsx("th", { className: "px-4 py-2 border-b text-left", children: "Updated At" })] }) }), _jsx("tbody", { children: products.map((product, index) => (_jsxs("tr", { draggable: true, onDragStart: (e) => handleDragStart(e, product), onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, index), className: "cursor-move hover:bg-gray-100", children: [_jsx("td", { className: "px-4 py-2 border-b text-center", children: index + 1 }), _jsx("td", { className: "px-4 py-2 border-b", children: _jsx("img", { src: product.image, alt: product.ProductName, className: "w-16 h-16 object-cover" }) }), _jsx("td", { className: "px-4 py-2 border-b", children: product.ProductName }), _jsx("td", { className: "px-4 py-2 border-b", children: product.IsTrending === true ? (_jsx("span", { className: "inline-block px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full", children: "Yes" })) : (_jsx("span", { className: "inline-block px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full", children: "No" })) }), _jsx("td", { className: "px-4 py-2 border-b", children: product.CreatedAt }), _jsx("td", { className: "px-4 py-2 border-b", children: product.UpdatedAt })] }, product.Id))) })] }) })] }));
}
export default RearrangeAdminProducts;
