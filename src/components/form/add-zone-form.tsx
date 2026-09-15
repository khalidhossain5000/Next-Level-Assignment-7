"use client"

import { useAddZone } from "@/hooks";
import { useForm } from "@tanstack/react-form";

const AddZoneForm = () => {
    const { mutate: addZone, isPending } = useAddZone()
    const form = useForm({
        defaultValues: {
            name: "Khulna Distrubution zone",
            code: "KHD-005",
            description: "this is the khulna distribution zone",
            zoneImage: null as File | null
        },
        onSubmit: async ({ value }) => {
            console.log(value, 'this is the value add zone')
            const zoneData = {
                name: value.name,
                code: value.code,
                description: value.description
            }
            addZone({ data: zoneData, zoneImage: value.zoneImage as File })
        }
    })
    return (
        <div>

        </div>
    );
};

export default AddZoneForm;