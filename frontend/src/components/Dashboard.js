import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [parameters, setParameters] = useState({ size: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/auth/user-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        console.log('Image:', image);
        console.log('Parameters:', parameters);
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl">Previously Generated Plans</h3>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create New Plan
                </button>
            </div>
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

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-2">Upload Image & Enter Parameters</h3>
                        <input type="file" onChange={handleImageUpload} className="mb-2" />
                        <input type="text" placeholder="Enter size" value={parameters.size} onChange={(e) => setParameters({ ...parameters, size: e.target.value })} className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Enter type" value={parameters.type} onChange={(e) => setParameters({ ...parameters, type: e.target.value })} className="border p-2 w-full mb-2" />
                        <div className="flex justify-end">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
