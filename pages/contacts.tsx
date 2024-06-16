import { NextPage } from 'next'
import { Avatar, Dropdown, Navbar, Label, TextInput, Button } from "flowbite-react";
import { FcContacts } from "react-icons/fc";
import ContactsList from '@/components/contacts/ContactsList';
import SearchComponent from '@/components/contacts/SearchComponent';
import axios from 'axios';
import { LiaPlusSolid } from "react-icons/lia";
import { useContext } from 'react';
import { StoreContext } from '@/store/StoreProvider';


const contacts: NextPage<any> = ({ contacts }) => {
    const { setOpen } = useContext(StoreContext)
    return (
        <div className=' w-full h-screen bg-[#F1F6F9]'>
            <Navbar fluid className=' w-full fixed z-10'>
                <Navbar.Brand href="/contacts" className='dark:text-white text-gray-500'>
                    <FcContacts className='mr-3 w-10 h-6 sm:h-9' />
                    <span className="self-center whitespace-nowrap md:text-lg text-xl font-semibold dark:text-white">Agenda de Contactos</span>
                </Navbar.Brand>
                <div className="flex sm:order-none md:order-2 mb-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Diego Espinoza</span>
                            <span className="block truncate text-sm font-medium">di3goDjesus@hotmail.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>

                </div>

                <SearchComponent />
            </Navbar>
            <div className=' md:py-5 md:px-5'>
                <ContactsList contacts={contacts} />
            </div>

        </div>
    )
}

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/contacts');
    const contacts = response.data;
    return {
        props: {
            contacts,
        },
    };
}

export default contacts
