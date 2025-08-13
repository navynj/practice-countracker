'use client';

import Button from '@/components/button/Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const AuthPage = () => {
  const googleAuthHandler = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[100dvh] bg-gray-100">
      <h1 className="text-3xl font-extrabold">Practice Countracker</h1>
      <div className="flex justify-center items-center bg-white rounded-4xl w-[280px] h-[280px]">
        <Image
          src="/logo.png"
          width={280}
          height={280}
          alt="plot logo"
          priority
        />
      </div>
      <form action={googleAuthHandler}>
        <Button
          type="submit"
          className="flex items-center space-x-2 py-2 px-10 pl-[1.5rem] bg-white border-gray-300 text-primary text-lg font-semibold rounded-xl shadow"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={0}
            height={0}
            className="w-[40px] h-auto "
          />
          <p>Sign in with Google</p>
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
