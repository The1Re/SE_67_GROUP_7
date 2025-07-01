import { QRCodeCanvas } from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import { env } from '@/config';

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    type: 'topup' | 'withdraw' | 'payment' | 'refund';
    transactionId?: string;
}

const QRCodeModal = ({ isOpen, onClose, amount, type, transactionId }: QRModalProps) => {
    if (!isOpen) return null;

    // Build QR code data based on transaction type
    const qrData = generatePayload(env.QR_PHONE_NUMBER, { amount })

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {type === 'topup' ? 'สแกนเพื่อเติมเงิน' : 'สแกนเพื่อถอนเงิน'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="text-center mb-4">
                    <p className="text-gray-600 mb-2">จำนวนเงิน</p>
                    <p className="text-2xl font-bold text-blue-600">{amount.toLocaleString('th-TH')} บาท</p>
                </div>

                <div className="flex justify-center my-6">
                    <div className="p-2 bg-white border-4 border-blue-100 rounded-lg">
                        <QRCodeCanvas value={qrData} size={200} level="H" />
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mb-4">
                    <p>กรุณาสแกน QR Code เพื่อทำรายการ</p>
                    {transactionId && (
                        <p className="mt-2">รหัสอ้างอิง: {transactionId}</p>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;