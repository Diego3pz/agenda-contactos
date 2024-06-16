import { StoreContext } from "@/store/StoreProvider";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useContext } from "react";

const contactId: NextPage<any> = (props) => {
    const router = useRouter()
    const idContact = String(router.query?.id);
    const { open, setOpen, formData, setFormData, openDelete, setOpenDelete, deleteData, setDeleteData } = useContext(StoreContext)

    const newArray = formData.filter(e => e.id === idContact)
    console.log(newArray);

    return (
        <div>

        </div>
    )
}


export default contactId