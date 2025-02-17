const Spinner = () => {
    return (
      <div className="flex items-center justify-center  w-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default Spinner;
  