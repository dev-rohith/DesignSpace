import React, { useEffect, useState } from "react";
import {
  Plus,
  Image as ImageIcon,
  AlertCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolioItem,
  getMyPortfolio,
} from "../../features/actions/designerActions";
import { ErrorState, Modal, Spinner } from "../../components";
import DesignerPortfolioItem from "../../components/ui/DesignerPortfolioItem";
import toast from "react-hot-toast";
import PortifolioItemOperations from "../../components/ui/PortifolioItemOperations";

const DesignerPortfolio = () => {
  const { portfolio, isLoading } = useSelector((store) => store.designer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPortfolio()).catch((err) => console.log(err));
  }, []);

  const handleAddPortfolioItem = () => {
    setIsModalOpen(true);
  };

  const handledeleteItem = async (id) => {
    console.log(id);
    const actionResult = await dispatch(deletePortfolioItem(id));
    if (deletePortfolioItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deletePortfolioItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleEditItem = (id) => {
    setEditId(id);
    setIsModalOpen(true);
  };

  if (isLoading) return <Spinner />;
  if (!portfolio) return <ErrorState error="Failed to Load Data" />;

  return (
    <div className="min-h-screen overflow-y-auto w-screen bg-gray-50">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsEditing(null);
            setIsModalOpen(false);
          }}
        >
          <PortifolioItemOperations isEditing={isEditing} />
        </Modal>
      )}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Portfolio</h1>
              <p className="text-gray-600">
                Showcase your best work to potential clients
              </p>
            </div>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Portfolio
            </button>
          </div>
        </div>
      </header>

      <div className="bg-violet-50 border-b border-violet-100">
        <div className="max-w-7xl mx-auto p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-violet-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-violet-900">
              Portfolio Guidelines
            </h3>
            <p className="text-sm text-violet-700">
              Maintain a maximum of 5 high-quality portfolios to highlight your
              best work.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {portfolio.map((item, index) => (
            <DesignerPortfolioItem
              key={item._id || index}
              {...item}
              editItem={handleEditItem}
              deleteItem={handledeleteItem}
            />
          ))}

          {portfolio.length < 3 && (
            <button
              onClick={handleAddPortfolioItem}
              className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 h-74 ml-2 mt-4 hover:border-violet-300 hover:bg-violet-50 transition-all group"
            >
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto text-gray-400 group-hover:text-violet-500" />
                <p className="mt-2 text-sm font-medium text-gray-500 group-hover:text-violet-600">
                  Add New Portfolio
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {3 - portfolio.length} slots remaining
                </p>
              </div>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default DesignerPortfolio;
