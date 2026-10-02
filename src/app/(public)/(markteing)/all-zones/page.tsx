import AllZones from "@/components/modules/all-zones-page/AllZones";
import React from "react";

const Page = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-manrope text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Power Zones
        </h1>

        <p className="mt-2 max-w-2xl font-inter text-sm leading-6 text-muted-foreground sm:text-base">
          Explore power zones and stay informed about their current status,
          infrastructure, and electricity availability.
        </p>
      </div>

      <AllZones />
    </section>
  );
};

export default Page;