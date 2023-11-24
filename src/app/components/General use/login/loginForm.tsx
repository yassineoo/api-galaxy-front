// components/LoginForm.js

export function LoginForm() {
  return (
    <div className="flex flex-col gap-4 text-black w-full  items-center">
      <div className="flex w-full sm:w-2/3 md:w-1/2 lg:w-3/5  flex-col items-start">
        <label className="text-xs text-gray-500 mb-2"> Email</label>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-lg  w-full"
        />
      </div>

      <div className="flex w-full sm:w-2/3 md:w-1/2  lg:w-3/5 flex-col items-start">
        <label className="text-xs text-gray-500"> Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg mt-2 mb-2  w-full"
        />
      </div>

      <div className="flex w-full sm:w-2/3 md:w-1/2  lg:w-3/5 flex-col items-start">
        <label className="text-xs text-gray-500">
          <input type="checkbox" className="mr-1" />
          Remember me{" "}
        </label>
      </div>

      <button className="bg-mainColor w-full sm:w-2/3 md:w-1/2  lg:w-3/5 mb-4 text-white py-2 px-4 rounded-lg hover:bg-blue-800">
        Login
      </button>
    </div>
  );
}
