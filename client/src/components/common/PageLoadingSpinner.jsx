const PageLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin"></div>
        <div className="absolute inset-0">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
export default PageLoadingSpinner;
