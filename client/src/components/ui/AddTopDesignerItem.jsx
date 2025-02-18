import { Plus, SearchCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Search from "../common/Search";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosIntance";

const AddTopDesignerItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designers, setDesinger] = useState([]);
   const [searchParams] = useSearchParams()

  useEffect(()=>{
        (async (params) => {
           const response = await axiosInstance.get(`/designer/all?${searchParams.toString()}`)
           console.log(response.data)
        })()
  },[searchParams])

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="border-2 h-48 mt-5 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50 overflow-hidden"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
          <Plus className="w-8 h-8" />
          <span className="text-sm font-medium">Add New Designer</span>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-3 p- rounded-xl ">
            <SearchCheck className="text-violet-700" /><Search className="h-8 text-sm " placeholder="Search designers" />
          </div>
        }
      >
        <div>

        </div>
      </Modal>
    </>
  );
};

export default AddTopDesignerItem;
