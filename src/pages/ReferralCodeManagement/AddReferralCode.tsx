import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import InputComponent from "../../components/Common/Inputes";
import { toast, ToastContainer } from "react-toastify";

type BodyPayload = {
  code: string;
  FullName: string;
  contactNumber: string;
};

const AddReferralCode: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [creating, setCreating] = useState(false);
  const [payload, setPayload] = useState<BodyPayload>({
    code: "",
    FullName: "",
    contactNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const access_token = localStorage.getItem("access_token");

      const response = await fetch(
        "https://api-v2.spa-cr.com/api/v2/admin/create-referral-code",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create referral code.");
      }

      toast.success("Referral code created successfully.");
      setTimeout(() => {
        navigate("/admin/referral-code-list");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="flex justify-end items-center mb-4 p-4 bg-gray-100 shadow-md rounded-lg">
        <Button text="Back" variant="lightBlue" onClick={() => navigate(-1)} />
      </div>

      <div className="p-8 bg-gray-50 shadow-md rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg space-y-6"
        >
          {/* Input Fields */}
          <div className="flex flex-col gap-6">
            {/* Row 1: Code and Full Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <InputComponent
                  type="text"
                  name="code"
                  label="Code"
                  value={payload.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full md:w-1/2">
                <InputComponent
                  type="text"
                  name="FullName"
                  label="Full Name"
                  value={payload.FullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Contact Number */}
            <div>
              <InputComponent
                type="text"
                name="contactNumber"
                label="Contact Number"
                value={payload.contactNumber}
                onChange={handleChange}
                
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <Button
              text={creating ? "Submitting…" : "Submit"}
              variant="primary"
              type="submit"
              disabled={creating}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReferralCode;
