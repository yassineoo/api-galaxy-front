'use client';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { resetPasswordInputs } from '@/types/common.types';
import { useForm } from 'react-hook-form';
import { resetPassword } from '@/actions/auth';

const page = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<resetPasswordInputs>();

  const onsubmit: SubmitHandler<resetPasswordInputs> = (data) => {
    if (data.confirmPass != data.pass) {
      return setError('errorMessage', {
        message: 'verify your inputs !',
      });
    }
    resetPassword(data, setError).then((res) => {
      if (res) router.push('/login');
    });
  };
  return (
    <div className="min-h-screen bg-white w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col shadow-2xl py-4 items-center max-w-sm w-full"
      >
        {/* your logo */}
        <div className="border-2 border-black border-dashed h-20 w-20 rounded-full" />

        <h3 className="font-Lora font-bold italic mt-4 mb-8 text-black">
          Modifiez votre mot de pass
        </h3>
        <p className="text-center my-3 text-black px-6">
          Saisissez un nouveau mot de passe ci-dessous pour modifier votre mot
          de passe.
        </p>
        <div className="relative mx-auto w-5/6">
          <input
            {...register('pass', {
              required: 'password is required',
              pattern: {
                message:
                  'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`\\]).{8,}$/,
              },
            })}
            type="text"
            className="px-4 py-2 rounded-md outline-none w-full border border-slate-500 my-3"
            placeholder="enter your new password"
          />
          <span className="text-red-500">{errors.pass?.message}</span>
        </div>

        <div className="relative mx-auto w-5/6">
          <input
            {...register('confirmPass', {
              required: 'new password is required',
            })}
            className="px-4 py-2 rounded-md outline-none border border-slate-500 w-full my-3"
            placeholder="confirm your password"
          />
        </div>
        <span className="text-red-500">{errors.confirmPass?.message}</span>

        <span className="text-red-500">{errors.errorMessage?.message}</span>
        <button className="my-4 py-2 bg-goldColor rounded-md w-5/6 text-black font-semibold">
          Continuer
        </button>

        {/* retour */}
        <span
          onClick={() => router.back()}
          className="underline text-seconadryColor"
        >
          retour
        </span>
      </form>
    </div>
  );
};

export default page;
