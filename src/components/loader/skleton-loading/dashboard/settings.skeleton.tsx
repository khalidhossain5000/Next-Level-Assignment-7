
const SettingsSkleton = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Profile Header Skeleton */}
        <div className="border-b border-border bg-muted/20 px-5 py-6 sm:px-7">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {/* Avatar */}
            <div className="size-24 animate-pulse rounded-full bg-muted sm:size-28" />

            {/* User Info */}
            <div className="flex w-full flex-col items-center gap-2 sm:items-start">
              <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />

              <div className="h-4 w-56 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="p-5 sm:p-7">
          <div className="max-w-xl">
            <div className="mb-2 h-4 w-20 animate-pulse rounded-md bg-muted" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />

            <div className="mt-2 h-3 w-72 animate-pulse rounded-md bg-muted" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="h-3 w-40 animate-pulse rounded-md bg-muted" />

          <div className="h-10 w-full animate-pulse rounded-xl bg-muted sm:w-36" />
        </div>
      </div>
    </div>
  );
};

export default SettingsSkleton;
