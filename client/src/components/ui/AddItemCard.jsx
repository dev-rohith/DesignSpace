const AddItemCard = ({ height = "h-[400px]", onClick }) => (
  <div
    onClick={onClick}
    className={`${height} border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50`}
  >
    <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
      <Plus className="w-8 h-8" />
      <span className="text-sm font-medium">Add New</span>
    </div>
  </div>
);

export default AddItemCard;