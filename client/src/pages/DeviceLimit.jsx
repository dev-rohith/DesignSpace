import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutDevice } from "../features/actions/authActions";
import toast from "react-hot-toast";

const DeviceLimit = ({}) => {
  const { devices } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (deviceId) => {
    const actionResult = await dispatch(logoutDevice(deviceId));
    if (actionResult.type === logoutDevice.fulfilled.type) {
      toast.success(actionResult.payload.message);
      navigate("/login");
    }else if (actionResult.type === logoutDevice.rejected.type) {
      toast.error(actionResult.payload);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Device Limit Reached
        </h1>
        <p className="text-gray-600 text-center mb-6">
          You have reached the maximum number of devices. Please log out from
          one of the following devices to continue.
        </p>
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <p className="font-medium text-gray-800">{device.deviceName}</p>
                <p className="text-sm text-gray-500">{device.deviceId}</p>
              </div>
              <button
                onClick={() => {
                  handleDelete(device.deviceId);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DeviceLimit;
