import { StoreContext } from '@/store/StoreProvider';
import React, { useContext, useEffect, useState } from 'react';
import { UserPlus, X } from 'react-feather';
import { Button, Label, TextInput } from "flowbite-react";
import { LiaPlusSolid } from "react-icons/lia";
import { toast } from 'react-toastify';

interface Contact {
    id: number;
    name: string;
    lastName?: string;
    email?: string;
    phone?: string[];
    address?: { street: string; city: string; zipcode: string }[];
}

interface ModalEditProps {
    contact: Contact;
    onSave: (formData: Contact) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ contact, onSave }) => {
    const { setOpenEdit } = useContext(StoreContext);
    const notify = () => toast.success('Contacto Actualizado', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const transformToArray = (value: string | string[]): string[] => {
        return Array.isArray(value) ? value : [value];
    };

    const [formData, setFormData] = useState<Contact>({
        ...contact,
        lastName: contact.lastName || '',
        phone: transformToArray(contact.phone || ''),
        address: Array.isArray(contact.address) ? contact.address : [contact.address || { street: '', city: '', zipcode: '' }]
    });

    useEffect(() => {
        setFormData({
            ...contact,
            lastName: contact.lastName || '',
            phone: transformToArray(contact.phone || ''),
            address: Array.isArray(contact.address) ? contact.address : [contact.address || { street: '', city: '', zipcode: '' }]
        });
    }, [contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) => {
        const { name, value } = e.target;

        if (type === 'phone') {
            const newPhones = [...formData.phone!];
            newPhones[index] = value;
            setFormData({ ...formData, phone: newPhones });
        } else if (type === 'address') {
            const newAddresses = [...formData.address!];
            newAddresses[index] = { ...newAddresses[index], [name]: value };
            setFormData({ ...formData, address: newAddresses });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addPhoneField = () => {
        setFormData({ ...formData, phone: [...formData.phone!, ''] });
    };

    const addAddressField = () => {
        setFormData({ ...formData, address: [...formData.address!, { street: '', city: '', zipcode: '' }] });
    };

    const removeField = (index: number, type: string) => {
        if (type === 'phone' && formData.phone!.length > 1) {
            const newPhones = formData.phone!.filter((_, i) => i !== index);
            setFormData({ ...formData, phone: newPhones });
        } else if (type === 'address' && formData.address!.length > 1) {
            const newAddresses = formData.address!.filter((_, i) => i !== index);
            setFormData({ ...formData, address: newAddresses });
        }
    };

    const handleSave = () => {
        onSave(formData);
        setOpenEdit(false);
        notify();
    };

    return (
        <form className="text-center w-full lg:w-[30rem] max-w-lg mx-auto">
            <div className='space-y-6'>
                <UserPlus size={56} className="mx-auto text-green-500 mb-2" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editar Contacto</h3>
            </div>
            <div className="space-y-6 text-start max-h-[60vh] overflow-y-auto p-4 mb-3">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Nombre" />
                    </div>
                    <TextInput
                        name="name"
                        value={formData.name}
                        placeholder="Nombre"
                        onChange={(e) => handleChange(e, 0, '')}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Apellidos" />
                    </div>
                    <TextInput
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Apellidos"
                        onChange={(e) => handleChange(e, 0, '')}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Correo" />
                    </div>
                    <TextInput
                        name="email"
                        value={formData.email}
                        placeholder="Correo electrónico"
                        onChange={(e) => handleChange(e, 0, '')}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Teléfono" />
                    </div>
                    {formData.phone && formData.phone.map((phone, index) => (
                        <div className='flex gap-2 place-items-center mb-2' key={index}>
                            <TextInput
                                name="phone"
                                value={phone}
                                placeholder="Teléfono"
                                onChange={(e) => handleChange(e, index, 'phone')}
                                required
                                className='mb-2 w-full'
                            />
                            <button
                                type="button"
                                onClick={() => removeField(index, 'phone')}
                                className="mb-2 rounded-lg text-gray-400 bg-white hover:bg-gray-100 p-2 hover:text-gray-600 transition-all"
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addPhoneField} className='w-full h-10 rounded-lg flex place-items-center justify-center text-blue-600 bg-gray-200 hover:bg-blue-200 transition-all font-medium'>
                        <LiaPlusSolid className='h-5 mr-2' />
                        Añadir Teléfono
                    </button>

                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Dirección" />
                    </div>
                    {formData.address && formData.address.map((address, index) => (
                        <div key={index} className='pl-5 gap-2 flex place-items-center mb-2'>
                            <div className='w-full'>
                                <TextInput
                                    name="street"
                                    value={address.street}
                                    placeholder="Calle"
                                    onChange={(e) => handleChange(e, index, 'address')}
                                    required
                                    className='mb-2'
                                />
                                <TextInput
                                    name="city"
                                    value={address.city}
                                    placeholder="Ciudad"
                                    onChange={(e) => handleChange(e, index, 'address')}
                                    required
                                    className='mb-2'
                                />
                                <TextInput
                                    name="zipcode"
                                    value={address.zipcode}
                                    placeholder="Código Postal"
                                    onChange={(e) => handleChange(e, index, 'address')}
                                    required
                                    className='mb-2'
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeField(index, 'address')}
                                className="mb-2 rounded-lg text-gray-400 bg-white hover:bg-gray-100 p-2 hover:text-gray-600 transition-all"
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addAddressField} className='w-full h-10 rounded-lg flex place-items-center justify-center text-blue-600 bg-gray-200 hover:bg-blue-200 transition-all font-medium'>
                        <LiaPlusSolid className='h-5 mr-2' />
                        Añadir Dirección
                    </button>
                </div>

            </div>
            <div className="w-full flex gap-4">
                <Button className="bg-green-500" onClick={handleSave}>Actualizar</Button>
                <Button className="bg-gray-500" onClick={() => setOpenEdit(false)}>Cancelar</Button>
            </div>
        </form>
    );
}

export default ModalEdit;