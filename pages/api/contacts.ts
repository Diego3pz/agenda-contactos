import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Address {
    street: string;
    city: string;
    zipcode: string;
}

interface Contact {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
}

interface User {
    name: string;
    lastName?: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users: User[] = response.data;

            const contacts: Contact[] = users.map((user, index) => ({
                id: index,
                name: user.name,
                lastName: user.lastName || '',
                email: user.email,
                phone: user.phone,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    zipcode: user.address.zipcode
                }
            }));
            res.status(200).json(contacts);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { name, lastName, email, phone, address } = req.body as Contact;

            if (!name || !lastName || !email || !phone || !address || !address.street || !address.city || !address.zipcode) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newContact: Contact = {
                id: Date.now(),
                name,
                lastName,
                email,
                phone,
                address
            };

            console.log('New contact created:', newContact);
            res.status(201).json(newContact);
        } catch (error) {
            console.error('Error handling POST request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
