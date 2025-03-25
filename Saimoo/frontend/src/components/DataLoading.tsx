const DataLoading = () => {
    return (
        <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
        </div>
        </div>
    );
}

export default DataLoading;