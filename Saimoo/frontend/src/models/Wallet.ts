export type WalletData = {
    id: number,
    balance: number,
    userId: number
}

export type Transaction = {
    id: string,
    type: 'topup' | 'withdraw' | 'payment',
    amount: number,
    status: 'pending' | 'completed' | 'failed',
    createdAt: Date,
}