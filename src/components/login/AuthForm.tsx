'use client';
import { authenticate } from '@/actions/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from '@/types/common.types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function AuthForm({ type }: { type: string }) {
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<Inputs>();
  const onsubmit: SubmitHandler<Inputs> = (data) => {
    authenticate(data, setError, setSuccess);
  };

  useEffect(() => {
    if (success && type == 'register') push('/login');
    if (success && type == 'login') push('/');
  }, [success]);
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col gap-4 text-black items-center border border-slate-200 p-5 py-10 rounded-md shadow-md max-w-md w-full"
    >
      <div className="w-full">
        <label className="text-sm font-semibold">
          {' '}
          Email
          <input
            type="email"
            placeholder="example@example.dz"
            className="p-2 my-2 outline-none rounded-lg w-full border border-slate-500"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          <span className="text-red-500">{errors.email?.message}</span>
        </label>
      </div>
      {type == 'register' && (
        <div className="w-full">
          <label className="text-sm font-semibold">
            {' '}
            Username
            <input
              type="text"
              {...register('username', {
                required: 'username is required',
              })}
              placeholder="username"
              className="p-2 my-2 outline-none rounded-lg w-full border border-slate-500"
            />
          </label>
        </div>
      )}
      <div className="w-full">
        <label className="text-sm font-semibold">
          {' '}
          Password
          <input
            type="password"
            placeholder="Password"
            className="p-2 my-2 rounded-lg outline-none w-full border border-slate-500"
            {...register('password', {
              required: 'password is required',
              pattern: {
                message:
                  'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`\\]).{8,}$/,
              },
            })}
          />
          <span className="text-red-500">{errors.password?.message}</span>
        </label>
      </div>

      <div className="w-full text-start">
        <label className="text-xs text-gray-500">
          <input type="checkbox" className="mr-2" />
          <span className="text-black font-bold">Remember me </span>
        </label>
      </div>
      <span className="text-red-500">{errors.errorMessage?.message}</span>
      {type == 'login' && (
        <span className="self-start text-sm">
          you forgot password ?{' '}
          <Link className="text-sm font-bold underline" href="/forgotPass">
            click here
          </Link>
        </span>
      )}
      <button
        type="submit"
        className="w-full text-center py-2 bg-goldColor rounded-md font-semibold"
      >
        {type}
      </button>
    </form>
  );
}
