import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TripDetails from "./TripDetails";
import { useState } from "react";

const dummy = [
    {
        id: 1,
        tripId: 1,
        description: 'description',
        day: 1,
        locationId: 1,
        arriveTime: '2021-09-01T00:00:00',
        order: 1,
    },
    {
        id: 2,
        tripId: 1,
        description: 'description',
        day: 1,
        locationId: 1,
        arriveTime: '2021-09-01T00:00:00',
        order: 2,
    },
    {
        id: 3,
        tripId: 1,
        description: 'description',
        day: 1,
        locationId: 1,
        arriveTime: '2021-09-01T00:00:00',
        order: 3,
    },
    {
        id: 4,
        tripId: 1,
        description: 'description',
        day: 1,
        locationId: 1,
        arriveTime: '2021-09-01T00:00:00',
        order: 4,
    }
]

function TripDetailList() {
    const [tripDetailData, setTripDetailData] = useState(dummy);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over && active.id !== over.id) {
            setTripDetailData(item => {
                const oldIndex = item.findIndex(({id}) => id === active.id);
                const newIndex = item.findIndex(({id}) => id === over.id);
                return arrayMove(item, oldIndex, newIndex);
            })
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={tripDetailData}>
                {tripDetailData.map((trip) => (
                    <TripDetails key={trip.id} id={trip.id} onDelete={null} onSelectLocation={null} />
                ))}
            </SortableContext>
        </DndContext>
    )
}

export default TripDetailList