import { useEffect, useState } from "react";
import { useGetUserDevicesQuery } from "../../store/slices/userSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setUserDevices,
  resetUsers,
} from "../../store/slices/userSlice/userSlice";
import { columns } from "../../constant/Columns";
import { useParams } from "react-router-dom";
import { ErrorMsg, Table } from "../../components/Common";

const UserDevices = ({ userId = "" }: { userId?: string }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { userDevices, isloading } = useAppSelector((state) => state.userSlice);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const uId: string = params.id || userId || "";

  // Pass both filters (search and verified) to the API call
  const { data, isLoading, isFetching, isError, refetch } =
    useGetUserDevicesQuery({
      page: currentPage,
      limit: itemsPerPage,
      uId,
    });

  useEffect(() => {
    if (data?.data) {
      dispatch(setUserDevices(data.data));
    }
    return () => {
      dispatch(resetUsers({ userDevices: [] }));
    };
  }, [data, dispatch]);

  useEffect(() => {
    refetch();
  }, [isloading, refetch]);

  if (isError) {
    return <ErrorMsg errorMsg="Error loading user data" />;
  }

  return (
    <Table
      data={userDevices}
      columns={columns.userDevices}
      loading={isLoading || isFetching}
      totalPages={data?.pagination?.totalPages || 1}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default UserDevices;
