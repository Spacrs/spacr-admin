import { useState } from "react";
import Button from "../../components/Common/Button";
import { useDispatch } from "react-redux";
import { useUpdateConfigFeesMutation } from "../../store/slices/spacrConfigSlice/apiSlice";

const DirectNotification = () => {
    const [fees, setFees] = useState("");
    const dispatch = useDispatch();

    const [updateConfigFees] = useUpdateConfigFeesMutation();
    
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Notification Sent:", { fees });
        await updateConfigFees(fees).unwrap()
        // dispatch(updateSpacrFees);
        // Clear form fields after submission
        setFees("");
        
    };

    return (
        <div className="flex justify-center items-center p-20 bg-gray-50">
            <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Spacr Config
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Title Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                            Config Fees
                        </label>
                        <input
                            type="number"
                            id="title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                            placeholder="Fees"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        className="lg:w-1/5 sm:w-1/2 xs:w-1/2 bg-primary text-white py-3 rounded-md hover:bg-primary transition"
                        text="Update"
                        type="secondary"
                        onClick={()=>{}}
                    />
                </form>
            </div>
        </div>
    );
};

export default DirectNotification;
