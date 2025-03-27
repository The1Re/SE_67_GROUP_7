import api from '@/api';
import ImageNotFound from '@/assets/imagenotfound.png';
import DataLoading from '@/components/DataLoading';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/models/User';
import { useEffect, useState } from 'react';

function Profile() {
    const { user } = useAuth();
    const [ owner, setOwner ] = useState<User>();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchOwner = async () => {
            setLoading(true);
            const response = await api.get<User>(`/users/${user.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setOwner(response.data);
            setLoading(false);
        };

        fetchOwner();
    }, [user]);

    if (loading) {
        return <DataLoading />
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full -translate-y-22 gap-4">
            <img 
                src="path_to_profile_image.jpg" 
                alt="Profile" 
                className="w-32 h-32 rounded-full mb-4"
                onError={(e) => {
                    e.currentTarget.src = ImageNotFound;
                }}
            />
            <div className='flex flex-col '>
                <h2 className="text-xl">@{owner.username}</h2>
                <h1 className="text-3xl font-bold">{owner.fullName}</h1>
                <p className="text-center mt-6">
                    Hi, 👋 my name is Thanayong Tammongkolkarnchana, thanks for visiting my profile. Let's travel together.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button 
                        className="bg-gray-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-700 transition duration-300"
                        onClick={() => alert('แก้ไขโปรไฟล์ clicked')}
                    >
                        แก้ไขโปรไฟล์
                    </button>
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300"
                        onClick={() => alert('ขอเป็นไกด์ clicked')}
                    >
                        ขอเป็นไกด์
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;