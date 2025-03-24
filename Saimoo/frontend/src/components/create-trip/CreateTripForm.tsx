import UploadImage from '../Trip/UploadImage'
import MyMap from '../map/MyMap'
import TripDetail from './TripDetail';
import TripForm from './TripForm';

function CreateTripForm() {

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-4/6 flex flex-col">
                <UploadImage />
                <div className="p-4 px-32 bg-white">
                    <TripForm />
                    <TripDetail />
                </div>
            </div>
            <div className="hidden md:flex w-2/6 h-screen bg-gray-200 items-center justify-center sticky top-0">
                <MyMap locations={null} />
            </div>
        </div>
    )
}

export default CreateTripForm