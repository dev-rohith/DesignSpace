import { Plus } from "lucide-react";
import { useState } from "react";

const AddTopDesignerItem = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
    onClick={() => setModalOpen(!modalOpen)}
     className=" border-2 h-48 mt-5 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50 overflow-hidden">
      <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
        <Plus className="w-8 h-8" />
        <span className="text-sm font-medium">Add New Designer</span>
      </div>
    </div>
  );
};
export default AddTopDesignerItem;
