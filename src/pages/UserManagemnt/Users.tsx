import { useEffect, useState } from "react";
import Table from "../../components/Common/Table";
import { useGetUsersQuery } from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const columns = [
  { name: "ProfilePictureURL", Header: "Profile Image", colName: "Image" },
  { name: "FullName", Header: "Name", colName: "Default" },
  { name: "Email", Header: "Email", colName: "Default" },
  { name: "Type", Header: "Type", colName: "Default" },
  { name: "Status", Header: "Status", colName: "Status" },
  { name: "Verified", Header: "Verification Status", colName: "Status" },
  { name: "CreatedAt", Header: "CreatedAt", colName: "Date" },
  {
    name: "action",
    Header: "Action",
    colName: "KebabMenu",
    options: [
      { label: "Activate", value: "active" ,type:"toggle" },
      { label: "Deactivate", value: "inactive",type:"toggle" },
      { label: "View Profile" , value :"",type:"button" }
    ],
  },
  // { name: "action", Header: "Actions", colName: "Actions" }
];

function Users() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector((state) => state.userSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetUsersQuery(currentPage);

  useEffect(() => {
    if (data?.data) {
      dispatch(getUsers(data.data));
    }
  }, [data, dispatch]);

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading user data
      </div>
    );
  }

  const handleToggleStatus = (val:any)=>{
    console.log(val)
  }

  const handleView = (val:any)=>{
    navigate(`/admin/users-details/${val.UserID}`)
    console.log(val)
  }

  return (
    <div className="p-4">
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
        <Table
          data={users}
          columns={columns}
          loading={isLoading}
          totalPages={data?.pagination?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleToggleStatus={handleToggleStatus}
          handleView={handleView}
        />
      </div>
    </div>
  );
}

export default Users;
