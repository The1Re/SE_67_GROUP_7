import { useState } from 'react';
import { useTrip } from '@/context/TripContext';
import UploadImage from '../Trip/UploadImage'
import MyMap from '../map/MyMap'
import TripForm from './TripForm';
import TripDetailList from './TripDetailList';

function CreateTripForm() {
    const { numDay } = useTrip();
    const [selectedDay, setSelectedDay] = useState<number>(1);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-4/6 flex flex-col">
                <UploadImage />
                <div className="p-4 md:px-32 bg-white">
                    <TripForm />
                    {
                        Array.from({ length: numDay }, (_, index) => (
                            <button 
                                key={index} 
                                className={`cursor-pointer m-2 p-2 ${selectedDay === index+1 ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded`}
                                onClick={() => setSelectedDay(index + 1)}
                            >
                                Day {index + 1}
                            </button>
                        ))
                    }
                    <div style={{ scrollBehavior: 'smooth' }}>
                        <TripDetailList day={selectedDay}/>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex w-2/6 h-screen bg-gray-200 items-center justify-center sticky top-0">
                <MyMap locations={null} />
            </div>
        </div>
    )
}

export default CreateTripForm