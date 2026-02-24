import { Link } from "react-router-dom";

export const test = () => {
  return (
    <div className="h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">
                  RilyQueue Admin
                </span>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
