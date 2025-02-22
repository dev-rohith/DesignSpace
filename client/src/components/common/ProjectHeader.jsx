const ProjectHeader = ({ name, status }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      {status}
    </div>
  </div>
);

export default ProjectHeader;
