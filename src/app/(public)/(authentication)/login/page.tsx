import Logo from '@/assets/svg/Logo';
import LoginForm from '@/components/form/login-form';
import Image from 'next/image';
import { Suspense } from 'react';

const Loginpage = () => {
    return (
     <section className="grid min-h-svh lg:grid-cols-2 bg-accent">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        
          <Logo/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
        <Suspense fallback={null}>
  <LoginForm />
</Suspense>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.jpg"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
    );
};

export default Loginpage;