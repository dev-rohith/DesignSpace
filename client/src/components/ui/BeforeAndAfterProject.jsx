import { useState } from "react";
import ImagesModal from "../common/ImagesModal";
import ImageRow from "../common/ImageRow";
import {
  addAfterProjectToPortfolio,
  addBeforeProjectToPortfolio,
  deleteAfterProjectToPortifolio,
  deleteBeforeProjectToPortifolio,
} from "../../features/actions/projectActions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const BeforeAndAfterProject = ({ _id, beforePictures, afterPictures }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [type, setType] = useState(null);
  const { isUpdating } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  const handleImageClick = (images, index, name) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setShowModal(true);
    setType(name);
  };

  const handleAfterItemUpload = async (file) => {
    if (!file) {
      toast.error("image not selected");
    }
    const formData = new FormData();
    formData.append("image", file);
    const actionResult = await dispatch(
      addAfterProjectToPortfolio({ _id, formData })
    );
    if (addAfterProjectToPortfolio.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      return true;
    } else if (addAfterProjectToPortfolio.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleBeforeItemUpload = async (file) => {
    if (!file) {
      toast.error("image not selected");
    }
    const formData = new FormData();
    formData.append("image", file);
    const actionResult = await dispatch(
      addBeforeProjectToPortfolio({ _id, formData })
    );
    if (addBeforeProjectToPortfolio.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      return true;
    } else if (addBeforeProjectToPortfolio.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleDeleteBeforeItem = async (itemId) => {
    const actionResult = await dispatch(
      deleteBeforeProjectToPortifolio({ projectId: _id, itemId })
    );
    if (deleteBeforeProjectToPortifolio.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setShowModal(false);
    } else if (deleteBeforeProjectToPortifolio.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleDeleteAfterItem = async (itemId) => {
    const actionResult = await dispatch(
      deleteAfterProjectToPortifolio({ projectId: _id, itemId })
    );
    if (deleteAfterProjectToPortifolio.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setShowModal(false);
    } else if (deleteAfterProjectToPortifolio.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ImageRow
        title="Before Pictures"
        name = "before"
        images={beforePictures}
        onImageClick={handleImageClick}
        onUpload={handleBeforeItemUpload}
      />

      <ImageRow
        title="After Pictures"
        name = "after"
        images={afterPictures}
        onImageClick={handleImageClick}
        onUpload={handleAfterItemUpload}
      />

      {showModal && (
        <ImagesModal
          selectedImages={selectedImages}
          currentImageIndex={currentImageIndex}
          nextImage={() =>
            setCurrentImageIndex((prev) =>
              prev === selectedImages.length - 1 ? 0 : prev + 1
            )
          }
          prevImage={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? selectedImages.length - 1 : prev - 1
            )
          }
          closeGallery={() => setShowModal(false)}
        >
          <button
            onClick={() => {
             type && (type === "before" ?
              handleDeleteBeforeItem(
                selectedImages[currentImageIndex].public_id
              ) :
              handleDeleteAfterItem(
                selectedImages[currentImageIndex].public_id
              ))
            }}
            className="text-white bg-red-500 py-2 px-8 hover:bg-red-700 cursor-pointer absolute top-25"
          >
            {isUpdating ? "Deleting..." : "Delete"}
          </button>
        </ImagesModal>
      )}
    </div>
  );
};

export default BeforeAndAfterProject;
