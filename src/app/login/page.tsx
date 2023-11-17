// components/AuthProviderButton.js

export function AuthProviderButton({ provider }: any) {
  return (
    <button
      className={`flex  w-4/5 lg:w-1/2  pl-6 gap-8 justify-start py-1 rounded-lg ${provider.color}`}
    >
      <img src={provider.logo} width={26} height={26} alt={provider.name} />
      <span className="ml-2 text-sm">Login with {provider.name}</span>
    </button>
  );
}

// components/LoginForm.js

export function LoginForm() {
  return (
    <div className="flex flex-col gap-4 text-black w-full  items-center">
      <div className="flex  w-3/5  flex-col items-start">
        <label className="text-xs text-gray-500"> Email</label>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-lg  w-full"
        />
      </div>
      <div className="flex w-3/5 flex-col items-start">
        <label className="text-xs text-gray-500"> Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg mt-2 mb-2  w-full"
        />
      </div>

      <div className="flex w-3/5 flex-col items-start">
        <label className="text-xs text-gray-500">
          <input type="checkbox" className="mr-1" />
          Remember me{" "}
        </label>
      </div>

      <button className="bg-blue-500 w-3/5 mb-4 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Login
      </button>
    </div>
  );
}

// pages/login.js
interface Provider {
  name: string;
  color: string;
  logo: string;
}

export default function LoginPage() {
  const authProviders: Provider[] = [
    {
      name: "Google",
      color: "bg-blue-500 text-white",
      logo: "icons/google.svg",
    },
    {
      name: "GitHub",
      color: "bg-gray-900 text-white",
      logo: "icons/github.svg",
    },

    {
      name: "Facebook",
      color: "bg-white border border-bla",
      logo: "icons/fb.svg",
    },
  ];

  return (
    <div className="flex flex-row-reverse w-full bg-white text-black h-screen ">
      <div className="hidden lg:block  lg:w-1/2">
        <img
          className="object-fill w-full h-full"
          src="images/login_bg_gateway.jpg"
          alt="Background image"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">
        <h2 className="text-xl font-medium mb-2">Get started now</h2>

        <div className="space-y-3 w-full flex flex-col items-center">
          {authProviders.map((provider) => (
            <AuthProviderButton key={provider.name} provider={provider} />
          ))}
        </div>

        <p className="mt-4 text-base mb-1">
          Have an account ? <a className="text-blue-500 ml-3"> Sign Up</a>
        </p>

        <div className="flex items-center mb-3">
          <div className="border-t border-gray-300 flex-grow mr-3" />
          <p className="text-gray-600 mx-3">Or</p>
          <div className="border-t border-gray-300 flex-grow ml-3" />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
