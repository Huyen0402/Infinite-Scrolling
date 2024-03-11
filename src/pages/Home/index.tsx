import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover amazing products here!
        </p>
        <div className="flex justify-between">
          <Link
            to="/products"
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md text-lg"
          >
            View Products
          </Link>
          <Link
            to="/products/search"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md text-lg"
          >
            Search Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
