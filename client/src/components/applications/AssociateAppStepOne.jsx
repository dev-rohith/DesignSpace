import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "../../context/MultiFormProvider";

const AssociateAppStepOne = () => {
  const { updateFormData } = useForm();
  const [pdfPreview, setPdfPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type === "application/pdf") {
        updateFormData({ resume: file });
        setPdfPreview(URL.createObjectURL(file));
        setErrorMessage("");
      } else {
        setErrorMessage("Please upload a valid PDF file.");
        setPdfPreview(null);
      }
    },
    [updateFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (pdfPreview) {
        URL.revokeObjectURL(pdfPreview);
      }
    };
  }, [pdfPreview]);

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <label className="uppercase font-bold text-xl text-gray-700">
          Upload Your Resume
        </label>
        <p className="text-sm text-gray-500">
          Drag and drop your PDF resume or click to browse
        </p>
      </div>

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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-gray-600">
              {isDragActive
                ? "Drop your PDF here"
                : "Drop your PDF here or click to browse"}
            </span>
            <span className="text-sm text-gray-500">Supports PDF files only</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      {pdfPreview && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
            <span className="font-medium">Resume Preview</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPdfPreview(null);
                updateFormData({ resume: null });
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
          <iframe 
            src={pdfPreview} 
            className="w-full h-[600px]" 
            title="Resume Preview"
          />
        </div>
      )}
    </div>
  );
};

export default AssociateAppStepOne;