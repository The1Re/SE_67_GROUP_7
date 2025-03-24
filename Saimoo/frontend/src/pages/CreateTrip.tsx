import CreateTripForm from '@/components/create-trip/CreateTripForm';
import { TripProvider } from '@/context/TripContext';

function CreateTrip() {

    return (
        <TripProvider>
            <CreateTripForm />
        </TripProvider>
    )
}

export default CreateTrip