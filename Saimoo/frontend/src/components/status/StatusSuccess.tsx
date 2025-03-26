const StatusSuccess = () => {
    return (
      <div>
        <label className="font-semibold">ให้คะแนนไกด์</label>
        <div className="flex gap-1 text-2xl my-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx}>☆</span>
          ))}
        </div>
        <textarea
          placeholder="review"
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>
    );
  };
  
  export default StatusSuccess;
  