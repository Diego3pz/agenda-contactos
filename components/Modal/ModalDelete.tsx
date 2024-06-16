import { StoreContext } from '@/store/StoreProvider';
import React, { useContext } from 'react';
import { Trash } from 'react-feather';
import { toast } from 'react-toastify';

interface FormData {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string[];
    address: { street: string; city: string; zipcode: string }[];
}

const ModalDelete: React.FC = () => {
    const { setOpen, deleteData, openDelete, setOpenDelete, formData, setFormData } = useContext(StoreContext);
    const notify = () => toast.error('Contacto Eliminado', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleDelete = (id: number) => {
        const newArray = formData.filter((e: FormData) => e.id !== id);
        setFormData(newArray);
        localStorage.setItem('contacts', JSON.stringify(newArray));
    }

    return (
        <div className="text-center w-56">
            <Trash size={56} className="mx-auto text-red-500" />
            <div className="mx-auto my-4 w-48">
                <h3 className="text-lg font-black text-gray-800">Confirmar Eliminar</h3>
                <p className="text-sm text-gray-500">
                    ¿Estás seguro de que quieres eliminar este contacto?
                </p>
            </div>
            <div className="flex gap-4">
                <button className="btn btn-danger w-full" onClick={() => { setOpenDelete(false); handleDelete(deleteData); notify(); }}>Eliminar</button>
                <button
                    className="btn btn-light w-full"
                    onClick={() => setOpenDelete(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ModalDelete;