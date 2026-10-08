import EmptyText from "@/components/layout/shared/empty-text/EmptyText";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
    "Loading",
    "Power Pulse is loading power schedules and service updates.",
    { noIndex: true },
);

const page = () => {
    return (
        <div>
            <EmptyText/>
        </div>
    );
};

export default page;