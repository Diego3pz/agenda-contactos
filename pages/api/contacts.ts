import axios from 'axios';

export default async function handler(req: Request, res: any) {
    if (req.method === 'GET') {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        const contacts = users.map((user, index) => ({
            id: index,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: {
                street: user.address.street,
                city: user.address.city,
                zipcode: user.address.zipcode
            }
        }));
        res.status(200).json(contacts);
    } else if (req.method === 'POST') {
        try {
            const { name, lastName, email, phone, address } = req.body;

            console.log('Received data:', req.body);

            if (!name || !lastName || !email || !phone || !address || !address.street || !address.city || !address.zipcode) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const newContact = {
                id: Date.now(), // Or any other logic to generate a unique ID
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

