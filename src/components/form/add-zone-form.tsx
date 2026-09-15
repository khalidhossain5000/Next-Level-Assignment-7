"use client"

import { useAddZone } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";

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
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                    <form.Field name="name">
                        {(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <Input
                                        id={field.name}
                                        placeholder="Zone Name ex:Dhaka Zone"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        className="pl-9"
                                        autoComplete="name"

                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>

                            )
                        }}
                    </form.Field>
                </div>
            </FieldGroup>
        </form>
    );
};

export default AddZoneForm;