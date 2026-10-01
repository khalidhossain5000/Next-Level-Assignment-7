"use client"

import { useGetArea } from "@/hooks";
interface IProps {
    id:string;
    title:string;
    currentAreaId:string;
}
const UpdateLoadSheddingModal = ({ id, title, currentAreaId }: IProps) => {
      const { data, isPending: areaPending } = useGetArea();
     const areas = data?.data ?? [];
    return (
        <div>
            
        </div>
    );
};

export default UpdateLoadSheddingModal;