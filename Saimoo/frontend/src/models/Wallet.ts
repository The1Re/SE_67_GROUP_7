export type WalletData = {
    id: number,
    balance: number,
    userId: number
}

export type Transaction = {
    id: string,
    type: 'topup' | 'withdraw' | 'payment' | 'refund',
    amount: number,
    status: 'pending' | 'completed' | 'failed',
    createdAt: Date,
}

export type PaymentRequest = {
    orderId: number,
    method: "wallet" | "qrcode",
} 