// src/pages/FeesManagement/SystemFeesForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/Common";
import {
  useCreateFeeMutation,
  useUpdateFeeMutation,
  useGetFeeDetailsQuery,
  FeeData,
} from "../../store/slices/feesSlice/apiSlice";

export default function SystemFeesFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);
  const { data: feeDetail } = useGetFeeDetailsQuery(Number(id), { skip: !isEdit });

  const [formData, setFormData] = useState<Partial<FeeData>>({
    BuyerProtectionFees: 0,
    // PaymentFees: 0,
    PlatformFees: 0,
    // PayoutFees: 0,
  });

  const [createFee] = useCreateFeeMutation();
  const [updateFee] = useUpdateFeeMutation();

  useEffect(() => {
    if (feeDetail) setFormData(feeDetail);
  }, [feeDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateFee(formData).unwrap();
        toast.success("Fee updated successfully!");
      } else {
        await createFee(formData).unwrap();
        toast.success("Fee created successfully!");
      }
      navigate("/admin/get-system-fees");
    } catch (err) {
      toast.error("Failed to save fee");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8 pt-20">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-md w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit System Fee" : "Add System Fee"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className="font-semibold mb-1">Buyer Protection Fees (In %)</span>
            <input
              type="number"
              name="BuyerProtectionFees"
              step="0.01"
              value={formData.BuyerProtectionFees}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>

          {/* <label className="flex flex-col">
            <span className="font-semibold mb-1">Payment Fees</span>
            <input
              type="number"
              name="PaymentFees"
              value={formData.PaymentFees}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label> */}

          <label className="flex flex-col">
            <span className="font-semibold mb-1">Platform Fees (In %)</span>
            <input
              type="number"
              name="PlatformFees"
              step="0.01"
              value={formData.PlatformFees}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>

          {/* <label className="flex flex-col">
            <span className="font-semibold mb-1">Payout Fees</span>
            <input
              type="number"
              name="PayoutFees"
              value={formData.PayoutFees}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label> */}

          <div className="flex justify-between mt-6">
            <Button
              text={isEdit ? "Update Fee" : "Create Fee"}
              variant="dark"
              onClick={handleSubmit}
            />
            <Button
              text="Cancel"
              variant="lightBlue"
              onClick={() => navigate("/system-fees")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
