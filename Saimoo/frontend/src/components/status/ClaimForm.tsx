import React, { useState } from "react";

const ClaimForm = ({ trigger }: { trigger?: React.ReactNode }) => {
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return alert("กรุณากรอกเหตุผล");
    alert("ส่งคำขอเรียบร้อยแล้ว");
    setIsOpen(false);
    setReason("");
    setFile(null);
  };

  return (
    <div className="text-right">
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          ขอเครมทริป
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-left">
            <h2 className="text-lg font-bold mb-4">ส่งเรื่องเครม</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">เหตุผล</label>
                <textarea
                  className="w-full rounded p-2 h-28 bg-gray-100"
                  placeholder="เหตุผล"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">รูปยืนยัน</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full rounded p-1 bg-gray-100"
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 cursor-pointer"
                >
                  ส่ง
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimForm;
