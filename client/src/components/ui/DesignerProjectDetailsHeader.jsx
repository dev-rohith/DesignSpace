const DesignerProjectDetailsHeader = ({ client, designer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-300">
      <div className="flex items-center gap-4 p-4 border rounded-md bg-gray-50">
        <img
          src={client.profilePicture}
          alt={`${client.firstName} ${client.lastName}`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">Client</h4>
          <p className="text-gray-600">{`${client.firstName} ${client.lastName}`}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border rounded-md bg-gray-50">
        <img
          src={designer.profilePicture}
          alt={`${designer.firstName} ${designer.lastName}`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">Designer</h4>
          <p className="text-gray-600">{`${designer.firstName} ${designer.lastName}`}</p>
        </div>
      </div>
    </div>
  );
};

export default DesignerProjectDetailsHeader;
