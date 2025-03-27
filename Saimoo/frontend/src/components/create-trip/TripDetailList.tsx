import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TripDetails from "./TripDetails";
import { useEffect, useState } from "react";
import { useTrip } from "@/context/TripContext";
import { TripDetail } from "@/models/Trip";
import { formatDateTimeLocal } from "@/utils/TimeFormat";

function TripDetailList({ day }: { day: number }) {
    const { trip, setTripDetail } = useTrip();
    const [tripDetailData, setTripDetailData] = useState<TripDetail[]>(trip.TripDetail.filter(detail => detail.day === day));

    useEffect(() => {
        setTripDetailData(trip.TripDetail.filter(detail => detail.day === day))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);

    useEffect(() => {
        if (tripDetailData.length === 0) {
            setTripDetailData([{ 
                id: Math.max(0, ...trip.TripDetail.map(detail => detail.id)) + 1, 
                order: 1, 
                arriveTime: new Date(),
                description: '', 
                day 
            }])
            return;
        }
        setTripDetail(day, tripDetailData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripDetailData, setTripDetail])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTripDetailData(items => {
                const oldIndex = items.findIndex(({ id }) => id === active.id);
                const newIndex = items.findIndex(({ id }) => id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
                    ...item,
                    order: index + 1
                }));
                return newItems;
            });
        }
    }

    const newTripDetail = () => {
        setTripDetailData(prev => [
            ...prev,
            {
                id: Math.max(0, ...trip.TripDetail.map(detail => detail.id)) + 1,
                order: prev.length + 1,
                arriveTime: new Date(),
                description: '',
                day
            }
        ])
    }

    const handleDelete = (id: number) => {
        setTripDetailData(prev => 
            prev
            .filter(detail => detail.id !== id)
            .map((detail, index) => ({
                ...detail,
                order: index + 1
            }))
        );
    }

    const handleUpdateTripDetail = (id: number, updatedFields: Partial<TripDetail>) => {
        setTripDetailData(prev =>
            prev.map(detail =>
                detail.id === id ? { ...detail, ...updatedFields } : detail
            )
        );
    };
    

    return (
        <DndContext autoScroll={{ layoutShiftCompensation: false }} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={tripDetailData}>
                {tripDetailData.map((tripDetail) => (
                    <TripDetails 
                        key={tripDetail.id}
                        title={tripDetail.order === 1 ? "จุดนัดพบ" : `สถานทีที่ ${tripDetail.order}`}
                        id={tripDetail.id}
                        initialDescription={tripDetail.description}
                        initialArriveTime={formatDateTimeLocal(tripDetail.arriveTime)}
                        location={tripDetail.Location}
                        images={tripDetail.TripDetailPicture && tripDetail.TripDetailPicture.imagePath}
                        onDelete={handleDelete}
                        onUpdate={handleUpdateTripDetail}
                    />
                
                ))}
            </SortableContext>
            <button 
                className="cursor-pointer mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                onClick={newTripDetail}
            >
                + เพิ่มสถานที่
            </button>
        </DndContext>
    )
}

export default TripDetailList