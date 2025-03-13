import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import {
  useGetUsersQuery,
  useUpdateUserInfoMutation,
} from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsers, resetUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/Common/Modal/ConfirmationModal"; // Import the modal component
import Button from '../../components/Common/Button';

const columns = [
  
  { name: "Name", Header: "Name", colName: "Default" },
  { name: "Mobile Number", Header: "Mobile Number", colName: "Default" },
  { name: "Email", Header: "Email", colName: "Default" },
  { name: "Message", Header: "Message", colName: "Default" },
  
];

function ContactSupportList() {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users,isloading } = useAppSelector((state) => state.userSlice);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  

  const [updateUserStatus] = useUpdateUserInfoMutation();

  const { data, isLoading, isError, refetch } = useGetUsersQuery({
    
  });

  const onClick = () => {

  }

  return (
    <div className="flex flex-col">
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search here..."
            value={filter}
             // Update search filter state
          />
        </div>

        <div className="ml-4">
          <Button type="lightBlue" onClick={onClick} text="Refresh" />
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={users}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      
    </div>
  );
}

export default ContactSupportList;

