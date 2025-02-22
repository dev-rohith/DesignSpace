const DesignerProjectDetailsHeader = ({client, designer}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 border-b-4 pb-4 border-violet-500 ">
      <div className="bg-gray-50 p-6 rounded-lg border-l-2 border-r-2 border-t-1 border-b-1">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={client.profilePicture}
            alt={`${client.firstName} ${client.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Client</h3>
            <p className="text-gray-600">{`${client.firstName} ${client.lastName}`}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg border-l-2 border-r-2 border-t-1 border-b-1 ">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={designer.profilePicture}
            alt={`${designer.firstName} ${designer.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Designer</h3>
            <p className="text-gray-600">{`${designer.firstName} ${designer.lastName}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesignerProjectDetailsHeader;
