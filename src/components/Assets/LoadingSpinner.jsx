const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-60">
      <div className="animate-spin rounded-full h-24 w-24 border-l-4 border-b-4 border-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
