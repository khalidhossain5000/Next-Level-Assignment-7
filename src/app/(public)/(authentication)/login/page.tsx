import Logo from '@/assets/svg/Logo';
import LoginForm from '@/components/form/login-form';
import Image from 'next/image';
import { Suspense } from 'react';

const Loginpage = () => {
  const quickLoginAccounts = {
    ADMIN: {
      email: process.env.TESTER_ADMIN_EMAIL ?? "",
      password: process.env.tester_admin_password ?? "",
    },
    CUSTOMER: {
      email: process.env.TESTER_CUSTOMER_EMAIL ?? "",
      password: process.env.TESTER_CUSTOMER_PASSWORD ?? "",
    },
    TECHNICIAN: {
      email: process.env.TESTER_TECHNICIAN_EMAIL ?? "",
      password: process.env.TESTER_TECHNICIAN_PASSWORD ?? "",
    },
  };

  return (
    <section className="grid min-h-svh bg-background lg:grid-cols-[minmax(440px,0.92fr)_1.08fr]">
      <div className="relative flex min-h-svh flex-col px-6 py-7 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex items-center">
          <Logo />
        </div>
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 space-y-2">
          
              <h1 className="font-manrope text-3xl font-bold sm:text-4xl">
                Welcome back.
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Sign in to stay on top of your power updates.
              </p>
            </div>
            <Suspense fallback={null}>
              <LoginForm quickLoginAccounts={quickLoginAccounts} />
            </Suspense>
          </div>
        </main>
        <p className="text-center text-xs text-muted-foreground lg:text-left">
          Powering a more informed community.
        </p>
      </div>
      <div className="relative hidden overflow-hidden bg-muted lg:block">
        <Image
          src="/login.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.45] dark:grayscale"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <p className="max-w-lg font-manrope text-3xl font-semibold leading-tight text-white xl:text-4xl">
            A clearer view of the power around you.
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Follow local schedules, outages, and updates from one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;