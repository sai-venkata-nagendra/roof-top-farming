import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

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
        <div className="dashboard-container">
            <h2 className="text-3xl font-bold mb-6 text-green-800">Dashboard</h2>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl">Previously Generated Plans</h3>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
                    Create New Plan
                </button>
            </div>
            {data.length === 0 ? <p>No past generations found.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <img src={item.image} alt="Generated Model" className="w-full h-48 object-cover rounded-lg mb-2" />
                            <p className="text-gray-700">{item.specifications}</p>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h3 className="text-lg font-bold mb-4">Upload Image & Enter Parameters</h3>
                        <input type="file" onChange={handleImageUpload} className="mb-4 w-full p-2 border rounded-lg" />
                        <input type="text" placeholder="Enter size" value={parameters.size} onChange={(e) => setParameters({ ...parameters, size: e.target.value })} className="border p-2 w-full mb-4 rounded-lg" />
                        <input type="text" placeholder="Enter type" value={parameters.type} onChange={(e) => setParameters({ ...parameters, type: e.target.value })} className="border p-2 w-full mb-4 rounded-lg" />
                        <div className="flex justify-end">
                            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition duration-300">Cancel</button>
                            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}