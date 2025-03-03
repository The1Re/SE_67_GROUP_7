const TransportationSelect = ({ transportation, setTransportation }) => {
    return (
        <div className="flex items-center space-x-2">
            <span>🚗</span>
            <select 
                value={transportation} 
                onChange={(e) => setTransportation(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
            >
                <option value="รถยนต์">รถยนต์</option>
                <option value="รถบัส">รถบัส</option>
            </select>
        </div>
    );
};

export default TransportationSelect;
