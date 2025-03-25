import { useState } from 'react';
import Modal from 'react-modal';
import LocationForm from './LocationForm';
import { Location } from '@/models/Trip';
import { useTrip } from '@/context/TripContext';
import { useNavigate } from 'react-router-dom';

function LocationModal({ tripDetailId, isOpen, setIsOpen, onUpdate }) {
    const { saveState } = useTrip();
    const navigate = useNavigate();
    const [ selected, setSelected ] = useState(false)

    const handleSumbit = (location: Location) => {
        onUpdate(tripDetailId, { Location: location})
        setIsOpen(false);
    }

    const handleTemple = () => {
        saveState();
        navigate('/temples', { state: { createMode: true }});
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="bg-white rounded-lg p-6 shadow-lg w-80 text-center"
            overlayClassName="fixed inset-0 flex items-center justify-center backdrop-blur-md z-5"
        >
            {
                selected ? (
                    <LocationForm onSubmit={handleSumbit} />
                ) : (
                    <div>
                        <h2 className="mb-4">เลือกประเภทสถานที่</h2>
                        <button
                            className="cursor-pointer w-full p-3 bg-blue-400 hover:bg-blue-500 rounded-lg text-white mb-2"
                            onClick={handleTemple}
                        >
                            วัด
                        </button>
                        <button
                            className="cursor-pointer w-full p-3 bg-gray-400 hover:bg-gray-500 rounded-lg text-white"
                            onClick={() => setSelected(true)}
                        >
                            สถานที่อื่นๆ
                        </button>
                    </div>
                )
            }
        </Modal>
    )
}

export default LocationModal