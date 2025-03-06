import React, { useEffect, useState } from "react";
import {
  UserCircle,
  Briefcase,
  FileText,
  Calendar,
  DollarSign,
  SearchCheck,
  UserPen,
  Loader,
} from "lucide-react";
import InputField from "../../components/common/InputField";
import { AddressSection, Modal } from "../../components";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosIntance";
import Search from "../../components/common/Search";
import toast from "react-hot-toast";
import { createProjectDataValidation } from "../../utils/validation";

const initialState = {
  title: "",
  description: "",
  client: "",
  minimumDays: "",
  budget: "",
  clientPic: "",
  clientStatus: "",
  clientName: "",
  address: {
    street: "",
    house_number: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  },
};

const CreateProject = () => {
  const [formData, setFormData] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const [clients, setClients] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(
        `/user/clients?${searchParams.toString()}`
      );
      console.log(response.data);
      setClients(response.data);
    })();
  }, [searchParams]);

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const errors = createProjectDataValidation(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    const data = { ...formData };
    delete data.clientName;
    delete data.clientPic;
    delete data.clientStatus;
    try {
      setIsUpdating(true);
      const response = await axiosInstance.post("/projects", data);
      toast.success(response.data.message);
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen overflow-y-auto w-screen">
      <div className=" flex items-center justify-center bg-gray-50">
        <div className="w-screen h-screen p-8">
          <h1 className="text-2xl font-bold text-pink-500 mb-8 ml-4">
            Create New Project :
          </h1>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={
              <div className="flex items-center gap-3 p- rounded-xl ">
                <SearchCheck className="text-violet-700" />
                <Search className="h-8 text-sm" placeholder="Search clients" />
              </div>
            }
          >
            <div>
              {clients.length === 0 && (
                <div className="flex items-center justify-center h-40">
                  <span className="text-sm">Not Found</span>
                </div>
              )}
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-200 cursor-pointer"
                >
                  <img
                    src={client.profilePicture}
                    alt={client.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {client.firstName} {client.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {client.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        client: client._id,
                        clientName: `${client.firstName} ${client.lastName}`,
                        clientPic: client.profilePicture,
                        clientStatus: client.status,
                      });
                      setIsModalOpen(false);
                    }}
                    className="ml-auto text-sm font-medium text-violet-700 cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </Modal>

          <form onSubmit={handleSubmit} className="flex gap-5">
            <div className="w-1/2 min-h-[calc(100vh-130px)] px-6 py-10 bg-white rounded-xl shadow-xs space-y-6">
              <InputField
                label="Project Title"
                icon={<Briefcase className="w-4 h-4" />}
                value={formData.title}
                onChange={(e) => {
                  handleInputChange("title", e.target.value);
                }}
                error={errors.title}
              />
              <div className="font-semibold mt-4 text-gray-500 flex items-center gap-2 mb-3">
                <UserPen className="h-5 w-5" />
                Clinet
              </div>
              {errors.client && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200 mb-2">
                  <span className="flex items-center gap-1 text-sm text-red-500 mt-1">
                    {errors.client}
                  </span>
                </div>
              )}
              {formData.client && (
                <div className="flex items-center gap-3 w-60 py-2 px-4 rounded-xl mb-4 bg-gray-100 border hover:bg-gray-200 cursor-pointer">
                  <img
                    src={formData.clientPic}
                    alt={formData.clientName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {formData.clientName}
                    </span>
                    <span
                      className={`text-xs ${
                        formData.clientStatus ? "bg-green-200" : "bg-red-200"
                      } px-1 rounded-4xl text-center`}
                    >
                      {formData.clientStatus}
                    </span>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="bg-gray-400 border-2 mb-6  border-violet-700 px-4 rounded-xl text-white hover:bg-violet-500 hover:border-none cursor-pointer"
              >
                Pick the client
              </button>

              <InputField
                disabled={isUpdating}
                label="Description"
                icon={<FileText className="w-4 h-4" />}
                value={formData.description}
                onChange={(e) => {
                  handleInputChange("description", e.target.value);
                }}
                error={errors.description}
              />

              <InputField
                disabled={isUpdating}
                label="Minimum Days"
                icon={<Calendar className="w-4 h-4" />}
                type="number"
                value={formData.minimumDays}
                onChange={(e) => {
                  handleInputChange("minimumDays", e.target.value);
                }}
                error={errors.minimumDays}
              />

              <InputField
                disabled={isUpdating}
                label="Budget"
                icon={<DollarSign className="w-4 h-4" />}
                type="number"
                value={formData.budget}
                onChange={(e) => {
                  handleInputChange("budget", e.target.value);
                }}
                error={errors.budget}
              />
            </div>

            <div className="w-1/2 min-h-[calc(100vh-130px)] p-4 bg-white rounded-xl shadow-xs ">
              <AddressSection
                address={formData.address}
                error={errors.address}
                handleInputChange={handleInputChange}
              />

              <button
                disabled={isUpdating}
                type="submit"
                className="py-2 px-4 mt-20  w-xl mx-9 bg-green-600  text-white rounded-xl font-medium transition-all hover:bg-green-700 focus:outline-none focus:ring-2  focus:ring-violet-500 focus:ring-offset-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-gray-500 uppercase"
              >
                {isUpdating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
