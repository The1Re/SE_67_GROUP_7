const TypeBadge = ({ type }: { type: string }) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type === 'topup' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
    >
        {type === 'topup' ? 'เติมเงิน' : type === 'withdraw' ? 'ถอนเงิน' : 'ชำระเงิน'}
    </span>
);

export default TypeBadge;