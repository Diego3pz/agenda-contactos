import { createContext, useState } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {

    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [formData, setFormData] = useState([]);
    const [deleteData, setDeleteData] = useState("")
    const [dataContact, setDataContact] = useState("")

    return (
        <StoreContext.Provider value={
            { inputValue, setInputValue, open, setOpen, formData, setFormData, openDelete, setOpenDelete, deleteData, setDeleteData, dataContact, setDataContact, openEdit, setOpenEdit }
        }>
            {children}
        </StoreContext.Provider>
    );
}

export { StoreContext };
export default StoreProvider;