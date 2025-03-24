const TransactionForm = ({
    amount,
    setAmount,
    onDeposit,
    onWithdraw,
    loading,
}: {
    amount: number;
    setAmount: (amount: number) => void;
    onDeposit: () => void;
    onWithdraw: () => void;
    loading: boolean;
}) => (
    <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4 text-gray-700">จัดการเงิน</h3>
        <div className="flex flex-col md:flex-row gap-4">
            <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="กรอกจำนวนเงิน"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-grow"
                disabled={loading}
            />
            <div className="flex gap-3">
                <button
                    onClick={onDeposit}
                    className={`cursor-pointer px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200 flex-grow text-center font-medium shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'กำลังทำรายการ...' : 'เติมเงิน'}
                </button>
                <button
                    onClick={onWithdraw}
                    className={`cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200 flex-grow text-center font-medium shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'กำลังทำรายการ...' : 'ถอนเงิน'}
                </button>
            </div>
        </div>
    </div>
);

export default TransactionForm;