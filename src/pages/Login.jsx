import React from 'react';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="admin@rilyqueue.com" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                    </div>
                    <button type="button" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
