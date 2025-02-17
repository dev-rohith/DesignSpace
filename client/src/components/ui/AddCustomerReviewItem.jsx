import { Loader2Icon, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerReviewItem } from "../../features/actions/adminactions";
import toast from "react-hot-toast";

const AddCustomerReviewItem = () => {
  const { isReviewsUpdating } = useSelector((store) => store.landing);
  const [itemData, setItemData] = useState({ name: "", review: "" });
  const [errros, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()

  const runInputErrors = () => {
    const error = {};
    if (itemData.name.length === 0) {
      error.name = "Name is required";
    } else if (!isNaN(itemData.name)) {
      error.name = "Name should not contain numbers";
    }
    if (itemData.review.split("").length <= 6) {
      error.review = "Review must contain at least 6 words";
    }
    return error;
  };

  const AddCustomerReview = async (video) => {
    const errors = runInputErrors();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    const Form = new FormData();
    Form.append("name", itemData.name);
    Form.append("review", itemData.review);
    Form.append("reviewVideo", video);
    const actionResult = await dispatch(addCustomerReviewItem(Form));
    if (addCustomerReviewItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setItemData({ name: "", review: "" });
      setPreview(null);
      setErrors({});
    } else if (addCustomerReviewItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
      return () => URL.revokeObjectURL(videoUrl);
    }
  };

  return (
    <div className="text-center">
      <div
        onClick={() => fileInputRef.current.click()}
        className=" border-2 mt-4 h-56 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50 overflow-hidden"
      >
        {preview ? (
          <iframe
            src={preview}
            className="w-full h-full object-cover rounded-lg"
          ></iframe> 
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">Add New</span>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="video/mp4"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      <div>
        {errros.name && <p className="text-red-500">{errros.name}</p>}
        <input
          value={itemData.name}
          onChange={(e) => {
            setItemData({ ...itemData, name: e.target.value });
          }}
          placeholder="Customer Name"
          type="text"
          className="border text-center  border-gray-400 mt-2 h-10 w-full rounded-xl placeholder:text-center"
        />
      </div>
      <div>
        {errros.review && <p className="text-red-500">{errros.review}</p>}
        <textarea
          value={itemData.review}
          onChange={(e) => {
            setItemData({ ...itemData, review: e.target.value });
          }}
          placeholder="Enter customer review here"
          type="text"
          className="border p-2 border-gray-400 mt-2 h-30 w-full rounded-xl placeholder:p-2"
        ></textarea>
      </div>
      {preview && (
        <button
          onClick={()=>{AddCustomerReview(fileInputRef.current.files[0])}}
          disabled={isReviewsUpdating}
          className="py-2 mt-2 text-gray-700  rounded-lg w-full bg-amber-300 cursor-pointer hover:border"
        >
          {isReviewsUpdating ? (
            <Loader2Icon className="h-5 w-5 mx-auto animate-spin" />
          ) : (
            "Add Review"
          )}
        </button>
      )}
    </div>
  );
};
export default AddCustomerReviewItem;
