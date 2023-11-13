// components/AuthProviderButton.js

export function AuthProviderButton({ provider }: any) {
  return (
    <button
      className={`flex  w-4/5 lg:w-2/3 items-center justify-center p-3 rounded-lg ${provider.color}`}
    >
      <img src={provider.logo} width={24} height={24} alt={provider.name} />
      <span className="ml-2">Login with {provider.name}</span>
    </button>
  );
}

// components/LoginForm.js

export function LoginForm() {
  return (
    <div className="flex flex-col gap-12 text-black">
      <input
        type="text"
        placeholder="Username"
        className="border p-2 rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded-lg mt-2 mb-4"
      />

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Login
      </button>
    </div>
  );
}

// pages/login.js

export default function LoginPage() {
  const authProviders = [
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
      color: "bg-white text-white",
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
        <h2 className="text-2xl font-medium mb-4">Get started now</h2>

        <div className="space-y-4 w-full flex flex-col items-center">
          {authProviders.map((provider) => (
            <AuthProviderButton key={provider.name} provider={provider} />
          ))}
        </div>

        <p className="my-4">
          Have an account? <a className="text-blue-500">Sign in</a>
        </p>

        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 flex-grow mr-3" />
          <p className="text-gray-600 mx-3">Or</p>
          <div className="border-t border-gray-300 flex-grow ml-3" />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
