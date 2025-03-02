import MyMap from "@/components/map/MyMap";

export const Trips = () => {
  return (
    <div className="h-full w-full flex flex-row">
      <div className="flex-1/2">
        <h1 className="mt-16">Trips</h1>
      </div>
      <div className="flex-1/2">
        <MyMap />
      </div>
    </div>
  )
}
