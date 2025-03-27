const BalanceCard = (
    { balance, loading }: { balance: number; loading: boolean }
) => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-semibold mb-2">ยอดเงินคงเหลือ</h1>
        {loading ? (
            <div className="animate-pulse h-8 w-48 bg-blue-300 rounded"></div>
        ) : (
            <h2 className="text-3xl font-bold">
                {balance.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
            </h2>
        )}
    </div>
);

export default BalanceCard;