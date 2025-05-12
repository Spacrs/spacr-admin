import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../store/slices/orderSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProducts } from "../../store/slices/orderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../../types/ProductData.types";
import { Search, Table, Button } from "../../components/Common";

function RearrangeAdminProducts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products: ProductData[] = useAppSelector(
    (state) => state.orderSlice.products
  );

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
      await fetch("https://api-v2.spa-cr.com/admin/reorder-suggested-products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
            text="Add Product"
            className="mr-2"
            variant="dark"
            type="button"
            onClick={() => navigate("/admin/add-suggested-product")}
          />
        </div>
      </div>

      {/* Product List Table */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md sm:overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
                <th className="px-4 py-2 border-b">S.No</th>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Created At</th>
                <th className="px-4 py-2 border-b">Updated At</th>
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
