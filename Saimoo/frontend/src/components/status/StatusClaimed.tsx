interface Props {
    claimStatus?: "กำลังดำเนินการ" | "สำเร็จ" | "ไม่สำเร็จ";
  }
  
  const StatusClaimed = ({ claimStatus = "กำลังดำเนินการ" }: Props) => {
    const color =
      claimStatus === "สำเร็จ"
        ? "text-green-600"
        : claimStatus === "ไม่สำเร็จ"
        ? "text-red-600"
        : "text-blue-600";
  
    return (
      <div className="text-sm mt-4 text-center">
        <p>สถานะเคลมล่าสุด:</p>
        <p className={`font-semibold ${color}`}>{claimStatus}</p>
      </div>
    );
  };
  
  export default StatusClaimed;
  