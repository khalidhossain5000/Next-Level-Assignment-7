"use client";

import { Pencil } from "lucide-react";

import { useUpdatePlannedOutage } from "@/hooks";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface IProps {
    id: string;
    title: string;
    description: string;
    reason: string;
}

const UpdatePlannedOutageModal = ({
    id,
    title,
    description,
    reason,
}: IProps) => {
    const { mutate: updatePlannedOutage, isPending: updatePending } =
        useUpdatePlannedOutage();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-[#f9a300]/30 bg-[#f9a300]/10 px-3 py-2 text-sm font-medium text-[#f9a300] transition-colors hover:bg-[#f9a300]/20"
                >
                    <Pencil className="size-4" />
                    Update
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Planned Outage</DialogTitle>
                </DialogHeader>

                <div className="py-6 text-center text-sm text-muted-foreground">
                    Form coming soon...
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePlannedOutageModal;