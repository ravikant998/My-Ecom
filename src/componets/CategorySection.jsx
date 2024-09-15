import { Category } from "../Data/Category";
const CategorySection = () => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        {Category.map((item, index) => (
          <div
            key={index}
            className="relative h-64 transform trasition-transform duration-300 hover-scale-105 cursor-pointer"
          >
            <img
              src={item.imageUrl}
              alt=""
              className="w-full h-full  object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-20  left-12">
              <p className="text-xl font-bold">{item.title}</p>
              <p className="text-gray-500 ">View All</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CategorySection;
