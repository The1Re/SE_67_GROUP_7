import { Transaction } from "@/models/Wallet";
import StatusBadge from "./StatusBadge";
import TypeBadge from "./TypeBadge";
import { convertDateTimeToThaiFormat } from "@/utils/TimeFormat";

const TransactionHistory = (
    { transactions, loading }: { transactions: Transaction[]; loading: boolean }
) => (
    <div className="bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium p-4 border-b text-gray-700">ประวัติธุรกรรม</h3>
        <div className="overflow-x-auto">
            {loading ? (
                <div className="p-8 flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภทรายการ</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายการเงินเข้า</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายการเงินออก</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่และเวลา</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <tr key={transaction.id || index} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <TypeBadge type={transaction.type} />
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-900">
                                        {transaction.type === 'topup' ? (
                                            <span className="text-green-600 font-medium">
                                                +{transaction.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-900">
                                        {transaction.type === 'withdraw' ? (
                                            <span className="text-red-600 font-medium">
                                                -{transaction.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <StatusBadge status={transaction.status} />
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{convertDateTimeToThaiFormat(transaction.createdAt)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    ไม่มีรายการธุรกรรม
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    </div>
);

export default TransactionHistory;