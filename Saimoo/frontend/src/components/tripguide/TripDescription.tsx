const TripDescription = ({ description, setDescription }) => {
    return (
        <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="คำอธิบายทริป"
            className="w-full p-2 border border-gray-300 rounded-lg"
        />
    );
};

export default TripDescription;
