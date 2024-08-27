const SkeletonProduct = () => {
  return (
    <div className="col-span-1 border rounded-md  bg-white">
      <div className="border-b-4 flex justify-center items-center h-40 bg-gray-300 rounded-md"></div>
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-1 items-center h-4 bg-gray-300 rounded w-24"></div>
        <p className="h-4 bg-gray-300 rounded w-32"></p>
        <p className="h-6 bg-gray-300 rounded w-20"></p>
        <button className="py-2 bg-gray-300 rounded-md min-w-8 h-8 w-32"></button>
        <button className="py-2 bg-gray-300 rounded-md min-w-8 h-8 w-32"></button>
      </div>
    </div>
  );
};

export default SkeletonProduct;
