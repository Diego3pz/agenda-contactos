import React, { useContext, useEffect } from 'react';
import { Table } from "flowbite-react";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import { StoreContext } from '@/store/StoreProvider';
import Modal from '../Modal/Modal';
import ModalCreate from '../Modal/ModalCreate';
import ModalDelete from '../Modal/ModalDelete';
import ModalEdit from '../Modal/ModalEdit';


interface Contact {
    id: string;
    name: string;
    lastName?: string;
    email: string;
    phone: string[] | string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    }[] | {
        street: string;
        city: string;
        zipcode: string;
    };
}

interface Props {
    contacts: Contact[];
}

const ContactsList: React.FC<Props> = ({ contacts }) => {
    const { inputValue, open, setOpen, formData, setFormData, openDelete, setOpenDelete, setDeleteData, dataContact, setDataContact, openEdit, setOpenEdit } = useContext(StoreContext);

    useEffect(() => {
        const apiDataLoaded = localStorage.getItem('apiDataLoaded');
        if (!apiDataLoaded) {
            axios.get('http://localhost:3000/api/contacts')
                .then(res => {
                    setFormData(res.data);
                    localStorage.setItem('contacts', JSON.stringify(res.data));
                    localStorage.setItem('apiDataLoaded', 'true');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const storedContacts = localStorage.getItem('contacts');
            if (storedContacts) {
                setFormData(JSON.parse(storedContacts));
            }
        }
    }, []);

    let results = [];
    if (!inputValue) {
        results = formData || [];
    } else {
        results = formData.filter((dato: { name: string; email: string; phone: string[] | string; }) => {
            const phoneArray = Array.isArray(dato.phone) ? dato.phone : [dato.phone];
            return dato.name.toLowerCase().includes(inputValue.toLowerCase())
                || dato.email.toLowerCase().includes(inputValue.toLowerCase())
                || phoneArray.some(phone => phone.toLowerCase().includes(inputValue.toLowerCase()));
        });
    }

    const handleSave = (updatedContact: Contact) => {
        const updatedContacts = formData.map((contact: { id: string; }) => contact.id === updatedContact.id ? updatedContact : contact);
        setFormData(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setOpenEdit(false);
        setDataContact(null);
    };

    return (
        <div className="overflow-x-auto md:mt-12">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className='hidden md:table-cell '>Correo electrónico</Table.HeadCell>
                    <Table.HeadCell className='hidden md:table-cell '>Teléfono</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell '>Dirección</Table.HeadCell>
                    <Table.HeadCell className='hidden md:table-cell '>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {Array.isArray(results) && results?.map(contact => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 group hover:bg-gray-200 transition-all hover:cursor-pointer flex justify-between md:table-row" key={contact.id}>
                            <Table.Cell className=" font-medium text-gray-900 dark:text-white md:">
                                {contact.lastName ? `${contact.name} ${contact.lastName}` : contact.name}
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell '>{contact.email}</Table.Cell>
                            <Table.Cell className='hidden md:table-cell '>{Array.isArray(contact.phone) && contact.phone.length > 0 ? contact.phone[0] : contact.phone}</Table.Cell>
                            <Table.Cell className='hidden lg:table-cell '>
                                {Array.isArray(contact.address) && contact.address.length > 0
                                    ? `${contact.address[0].street}, ${contact.address[0].city}, ${contact.address[0].zipcode}`
                                    : `${contact.address.street}, ${contact.address.city}, ${contact.address.zipcode}`}
                            </Table.Cell>
                            <div className='flex'>
                                <Table.Cell className='inline-block md:table-cell '>
                                    <button className="font-medium group-hover:underline opacity-100 lg:opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-200 transition-all rounded-full hover:bg-gray-400  p-2" onClick={() => { setOpenEdit(true); setDataContact(contact); }}>
                                        <MdEdit size={20} />
                                    </button>
                                </Table.Cell>
                                <Table.Cell className='inline-block md:table-cell '>
                                    <button className="font-medium group-hover:underline opacity-100 lg:opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-200 transition-all rounded-full hover:bg-gray-400  p-2" onClick={() => { setOpenDelete(true); setDeleteData(contact.id); }}>
                                        <MdDelete size={20} />
                                    </button>
                                </Table.Cell>
                            </div>

                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalCreate />
            </Modal>

            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                {dataContact && <ModalEdit contact={dataContact} onSave={handleSave} />}
            </Modal>

            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                <ModalDelete />
            </Modal>
        </div>
    );
}


export default ContactsList
