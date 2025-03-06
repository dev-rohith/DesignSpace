import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskProgress } from "../../../features/actions/taskActions";
import toast from "react-hot-toast";

const UpdateTaskProgress = ({ taskId }) => {
  const { isUpdating } = useSelector((state) => state.task);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  // Handle file drop with react-dropzone
  const onDrop = useCallback((acceptedFiles) => {
    // Create preview URLs for the accepted files
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    files.forEach((file) => formData.append("files", file));
    const actionResult = await dispatch(
      updateTaskProgress({ id: taskId, formData })
    );
    if (updateTaskProgress.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setDescription("");
      setFiles([]);
    } else if (updateTaskProgress.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const removeFile = (fileToRemove) => {
    URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="p-6 w-3xl space-x-3 max-h-max mx-auto bg-white rounded-xl shadow-md">
      <h4 className="text-xl text-violet-800 font-semibold mb-2 border-b pb-2 border-violet-700">
        Task Update
      </h4>
      <div className=" border border-gray-600 rounded-md px-2 py-4 italic">
        <h5 className="text-md font-semibold  text-violet-800 underline">
          Read the instructions :{" "}
        </h5>
        <p className=" text-sm tracking-tight text-red-600">
          Before updating the task make sure you have the latest instructions
          from the designer/client. You fully tracked by the Designer where Your
          updating the task with full Co-Ordinates{" "}
          <b>(dont use the vpn or any other proxy)</b>. If we catch you using
          the proxy or vpn we will terminate from the task and your account will
          get suspended permanently.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (at least one required)
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here...</p>
            ) : (
              <p>Drag and drop images here, or click to select files</p>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Image Previews:
            </h3>
            <div className="flex flex-wrap gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative w-fit">
                  <img
                    src={file.preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => removeFile(file)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={files.length === 0 || isUpdating}
            className="w-full py-2 rounded-md text-white font-medium  bg-violet-500 hover:bg-violet-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <span className="animate-pulse">⌛</span>
            ) : (
              "Update Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskProgress;
