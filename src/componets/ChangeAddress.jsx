const ChangeAddress = () => {
  return (
    <>
      <div>
        <h3 className="text-center mb-4 font-bold text-lg">
          Change your address
        </h3>
        <input
          type="text"
          placeholder="Enter new address"
          className="border p-2 w-full mb-4 "
        />
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            Save address
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
