import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProducts } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../types/ProductData.types";
import { Search, Table, Button } from "../../components/Common";
import { useSelector } from 'react-redux';


function RearrangeAdminProducts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products: ProductData[] = useAppSelector(
    (state) => state.orderSlice.products
  );
  
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
      const formattedProducts = data.data.map((product: ProductData) => ({
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


if (isError) return <div className="p-4 bg-red-500 text-white rounded-lg">Error loading orders</div>;

  const handleDragStart = (e: React.DragEvent, product: ProductData) => {
    e.dataTransfer.setData("product", JSON.stringify(product));
  };

  const handleDrop = async (e: React.DragEvent, index: number) => {
    const draggedProduct = JSON.parse(e.dataTransfer.getData("product"));
    const updatedProducts = [...products];
    const draggedIndex = updatedProducts.findIndex(
      (item) => item.Id === draggedProduct.Id
    );
  
    if (draggedIndex === -1) return;
  
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

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/admin/reorder-suggested-products`, {
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
    } catch (err) {
      console.error("Error updating order", err);
    }
  };
  
  

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow the drop event
  };

  return (
    <div>
      {/* Top bar with search */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <div className="flex flex-1 max-w-lg">
          <Search
            search={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            placeholder="Search by name..."
            onReset={() => setFilter("")}
          />
        </div>
        <div className="ml-4">
          <Button
            text="Go Back"
            className="mr-2"
            variant="dark"
            type="button"
            onClick={() => navigate("/admin/suggested-product-list")}
          />
        </div>
      </div>

      {/* Product List Table */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
                <th className="px-4 py-2 border-b text-left">S.No</th>
                <th className="px-4 py-2 border-b text-left">Image</th>
                <th className="px-4 py-2 border-b text-left">Product Name</th>
                <th className="px-4 py-2 border-b text-left">Is Trending</th>
                <th className="px-4 py-2 border-b text-left">Created At</th>
                <th className="px-4 py-2 border-b text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.Id}
                draggable
                onDragStart={(e) => handleDragStart(e, product)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="cursor-move hover:bg-gray-100"
              >
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={product.image}
                    alt={product.ProductName}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border-b">{product.ProductName}</td>
                <td className="px-4 py-2 border-b">
                  {product.IsTrending === true ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">{product.CreatedAt}</td>
                <td className="px-4 py-2 border-b">{product.UpdatedAt}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RearrangeAdminProducts;
