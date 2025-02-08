const TopDesigners = ({ data = [] }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-12">
      <div className=" flex gap-1 w-full md:w-1/2 h-72">
        {data.map((item, index) => (
          <Card key={item._id || index} {...item} />
        ))}
      </div>

      <div className="w-full md:w-1/2 text-center">
        <h3 className="text-2xl font-semibold uppercase mb-4">
          Meet our Top Designers
        </h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          quisquam.
        </p>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="w-44 bg-gray-200 rounded-md">
      {/* <img src={image} alt={name} className="w-full h-full object-cover" /> */}
    </div>
  );
}






export default TopDesigners;
