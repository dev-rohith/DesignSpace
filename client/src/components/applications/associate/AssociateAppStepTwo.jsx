import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "../../../context/MultiFormProvider";

const AssociateAppStepTwo = () => {
  const { updateFormData } = useForm();
  const [videoPreview, setVideoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type === "video/mp4") {
        updateFormData({ introduction: file });
        setVideoPreview(URL.createObjectURL(file));
        setErrorMessage("");
      } else {
        setErrorMessage("Please upload a valid MP4 video file.");
        setVideoPreview(null);
      }
    },
    [updateFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 100 * 1024 * 1024 
  });

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <label className="uppercase font-bold text-xl text-gray-700">
          Upload Your Introduction Video
        </label>
        <p className="text-sm text-gray-500">
          Drag and drop your MP4 video or click to browse
        </p>
      </div>

      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`
          min-h-[200px] w-full border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center p-6 transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center space-y-2">
          <svg
            className={`w-12 h-12 ${isDragActive ? "text-blue-500" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-gray-600">
              {isDragActive
                ? "Drop your video here"
                : "Drop your video here or click to browse"}
            </span>
            <span className="text-sm text-gray-500">
              Supports MP4 files only (max 100MB)
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      {videoPreview && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
            <span className="font-medium">Video Preview</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVideoPreview(null);
                updateFormData({ introduction: null });
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <video 
            src={videoPreview} 
            className="w-full max-h-[600px]" 
            controls
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default AssociateAppStepTwo;