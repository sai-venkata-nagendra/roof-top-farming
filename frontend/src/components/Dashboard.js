import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/user-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            {data.length === 0 ? <p>No past generations found.</p> : (
                <div className="grid grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <img src={item.image} alt="Generated Model" className="w-full h-32 object-cover" />
                            <p>{item.specifications}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
