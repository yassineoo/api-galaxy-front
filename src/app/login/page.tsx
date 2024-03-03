
/*export function AuthProviderButton({ provider }: any) {
  return (
    <button
      className={`flex  w-4/5 lg:w-1/2  pl-6 gap-8 justify-start py-1 rounded-lg ${provider.color}`}
    >
      <img src={provider.logo} width={26} height={26} alt={provider.name} />
      <span className="ml-2 text-sm">Login with {provider.name}</span>
    </button>
  );
}
*/
// components/LoginForm.js
import { AuthProviderButton } from '@/components/login/AuthProviderButton';
import { AuthForm } from '@/components/login/AuthForm';
import { Provider } from '@/types/common.types';
import Link from 'next/link';

export default async function LoginPage() {
  const authProviders: Provider[] = [
    {
      name: 'google',
      color: 'bg-blue-500 text-white',
      logo: '/icons/google.svg',
    },
    {
      name: 'github',
      color: 'bg-gray-900 text-white',
      logo: '/icons/github.svg',
    }
  ];

  return (
    <div className="flex flex-row-reverse w-full bg-white text-black h-screen ">
      <div className="hidden lg:block  lg:w-1/2">
        <img
          className="object-fill w-full h-full"
          src="/images/login_bg_gateway.jpg"
          alt="Background image"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Welcome back !</h2>

        <div className="space-y-3 w-full flex flex-col items-center">
          {authProviders.map((provider) => (
            <AuthProviderButton key={provider.name} provider={provider} />
          ))}
        </div>

        <p className="mt-4 text-base mb-1">
          haven't an account ?{' '}
          <Link href={'/register'} className="text-blue-500 ml-3 underline">
            {' '}
            register now
          </Link>
        </p>

        <div className="flex items-center mb-3">
          <div className="border-t border-gray-300 flex-grow mr-3" />
          <p className="text-gray-600 mx-3">Or</p>
          <div className="border-t border-gray-300 flex-grow ml-3" />
        </div>

        <AuthForm type="login" />
      </div>
    </div>
  );
}
