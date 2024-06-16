import { StoreContext } from '@/store/StoreProvider';
import React, { useContext, useState, useEffect } from 'react';
import { UserPlus, X } from 'react-feather';
import { Button, Label, TextInput } from "flowbite-react";
import { LiaPlusSolid } from "react-icons/lia";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalCreate = () => {
    const notify = () => toast.info('Contacto Agregado', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const { setOpen } = useContext(StoreContext);
    const { formData, setFormData } = useContext(StoreContext);
    const [localFormData, setLocalFormData] = useState({
        id: Date.now(),
        name: '',
        lastName: '',
        email: '',
        phone: [''],
        address: [{ street: '', city: '', zipcode: '' }]
    });

    useEffect(() => {
        setLocalFormData({
            id: Date.now(),
            name: '',
            lastName: '',
            email: '',
            phone: [''],
            address: [{ street: '', city: '', zipcode: '' }]
        });
    }, [setOpen]);

    const handleChange = (event, index, type) => {
        const { name, value } = event.target;

        if (type === 'phone') {
            const newPhones = [...localFormData.phone];
            newPhones[index] = value;
            setLocalFormData({ ...localFormData, phone: newPhones });
        } else if (type === 'address') {
            const newAddresses = [...localFormData.address];
            newAddresses[index] = { ...newAddresses[index], [name]: value };
            setLocalFormData({ ...localFormData, address: newAddresses });
        } else {
            setLocalFormData({ ...localFormData, [name]: value });
        }
    };

    const addPhoneField = () => {
        setLocalFormData({ ...localFormData, phone: [...localFormData.phone, ''] });
    };

    const addAddressField = () => {
        setLocalFormData({ ...localFormData, address: [...localFormData.address, { street: '', city: '', zipcode: '' }] });
    };

    const removeField = (index, type) => {
        if (type === 'phone' && localFormData.phone.length > 1) {
            const newPhones = localFormData.phone.filter((_, i) => i !== index);
            setLocalFormData({ ...localFormData, phone: newPhones });
        } else if (type === 'address' && localFormData.address.length > 1) {
            const newAddresses = localFormData.address.filter((_, i) => i !== index);
            setLocalFormData({ ...localFormData, address: newAddresses });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedContacts = [...formData, localFormData];
        setFormData(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setLocalFormData({
            id: Date.now(),
            name: '',
            lastName: '',
            email: '',
            phone: [''],
            address: [{ street: '', city: '', zipcode: '' }]
        });
        setOpen(false);
    };

    return (
        <form className="text-center w-full lg:w-[30rem]  max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className='space-y-6'>
                <UserPlus size={56} className="mx-auto text-blue-500 mb-2" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nuevo Contacto</h3>
            </div>
            <div className="space-y-6 text-start max-h-[60vh] overflow-y-auto p-4 mb-3">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Nombre" />
                    </div>
                    <TextInput
                        name="name"
                        placeholder="Nombre"
                        value={localFormData.name}
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Apellidos" />
                    </div>
                    <TextInput
                        name="lastName"
                        placeholder="Apellidos"
                        value={localFormData.lastName}
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Correo" />
                    </div>
                    <TextInput
                        name="email"
                        placeholder="Correo electrónico"
                        value={localFormData.email}
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        required
                        type='email'
                    />
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Teléfono" />
                    </div>
                    {localFormData.phone.map((phone, index) => (
                        <div className='flex gap-2 place-items-center mb-2' key={index}>
                            <TextInput
                                name="phone"
                                placeholder="Teléfono"
                                value={phone}
                                autoComplete="off"
                                onChange={(e) => handleChange(e, index, 'phone')}
                                required
                                className='mb-2 w-full'
                                type='number'

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
                    {localFormData.address.map((address, index) => (
                        <div key={index} className='pl-5 gap-2 flex place-items-center mb-2'>
                            <div className='w-full'>
                                <TextInput
                                    name="street"
                                    placeholder="Calle"
                                    value={address.street}
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e, index, 'address')}
                                    required
                                    className='mb-2'
                                />
                                <TextInput
                                    name="city"
                                    placeholder="Ciudad"
                                    value={address.city}
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e, index, 'address')}
                                    required
                                    className='mb-2'
                                />
                                <TextInput
                                    name="zipcode"
                                    placeholder="Código Postal"
                                    value={address.zipcode}
                                    autoComplete="off"
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
                <Button className='bg-blue-500' type='submit' onClick={() => notify()}>Agregar Contacto</Button>
                <Button className="bg-gray-500" onClick={() => setOpen(false)}>Cancelar</Button>
            </div>
        </form>
    );
}

export default ModalCreate;