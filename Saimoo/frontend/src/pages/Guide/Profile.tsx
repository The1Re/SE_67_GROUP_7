import api from '@/api';
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
              src="https://i.pravatar.cc/45"
              alt="fernfunnys.journey"
              className="rounded-full object-cover w-40 h-40"
            />

            <div className='flex flex-col '>
                <h2 className="text-xl">@{owner.username}</h2>
                <h1 className="text-3xl font-bold">{owner.fullName}</h1>
                <p className="text-center mt-6">
                    Welcome to my profile!<br />
                    I am a travel enthusiast who loves to explore new places and share my experiences with others. <br />
                </p>
            </div>
        </div>
    );
}

export default Profile;