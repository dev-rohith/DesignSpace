import { useState, useRef, useEffect } from "react";
import { Loader2Icon, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { addCaroseulItem } from "../../features/actions/adminactions";
import { useDispatch, useSelector } from "react-redux";

const AddLandingCarouselItem = () => {
  const { isCarouselUpdating } = useSelector((store) => store.landing);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const handleImageAdd = async (file) => {
    if (!file) {
      toast.error("Pick an image first to add");
    }
    const Form = new FormData();
    Form.append("carousel", file);

    const actionResult = await dispatch(addCaroseulItem(Form));
    if (addCaroseulItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setImage(null);
    } else if (addCaroseulItem.rejected.match(actionResult)) {
      console.log(actionResult.payload);
      toast.error(actionResult.payload?.message || actionResult.payload.error);
    }
  };

  return (
    <div className="text-center">
      <div
        onClick={() => fileInputRef.current.click()}
        className=" border-2 h-[300px] border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50 overflow-hidden"
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">Add New</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <button
          onClick={() => {
            handleImageAdd(fileInputRef.current.files[0]);
          }}
          disabled={isCarouselUpdating}
          className="w-full bg-green-400 py-2 mt-2  text-white font-semibold hover:bg-green-500 cursor-pointer disabled:bg-gray-600"
        >
          {isCarouselUpdating ? (
            <Loader2Icon className="h-5 w-5 mx-auto animate-spin" />
          ) : (
            "Add Carousel Item"
          )}
        </button>
      )}
    </div>
  );
};

export default AddLandingCarouselItem;
