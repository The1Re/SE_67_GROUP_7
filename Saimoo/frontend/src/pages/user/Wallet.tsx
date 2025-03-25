import { useState, useEffect, useCallback } from 'react';
import api from '@/api';
import type { WalletData, Transaction } from '@/models/Wallet';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import BalanceCard from '@/components/wallet/BalanceCard';
import TransactionForm from '@/components/wallet/TransactionForm';
import ErrorAlert from '@/components/wallet/ErrorAlert';
import QRCodeModal from '@/components/wallet/QRCodeModal';

function Wallet() {
    const [balance, setBalance] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
    const [transactionType, setTransactionType] = useState<'topup' | 'withdraw'>('topup');
    const token = localStorage.getItem('token');

    const fetchWalletData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get<WalletData>('/wallets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBalance(response.data.balance);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
            setError('ไม่สามารถดึงข้อมูลกระเป๋าเงินได้');
            setLoading(false);
        }
    }, [token]);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await api.get<Transaction[]>('/wallets/transaction', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransactions(
                response.data.map((transaction) => ({
                    ...transaction,
                    createdAt: new Date(transaction.createdAt)
                }))
            );
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('ไม่สามารถดึงประวัติธุรกรรมได้');
        }
    }, [token]);

    useEffect(() => {
        fetchWalletData();
        fetchTransactions();
    }, [fetchWalletData, fetchTransactions]);

    const handleDeposit = async () => {
        if (amount <= 0) {
            setError('กรุณาระบุจำนวนเงินมากกว่า 0');
            return;
        }

        try {
            setLoading(true);
            await api.post<WalletData>(
                '/wallets/topup',
                { amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTransactionType('topup');
            setQrModalOpen(true);
            setLoading(false);

            fetchTransactions();
            setError(null);
        } catch (error) {
            console.error('Error depositing funds:', error);
            setError('ไม่สามารถเติมเงินได้ กรุณาลองอีกครั้ง');
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (amount <= 0) {
            setError('กรุณาระบุจำนวนเงินมากกว่า 0');
            return;
        }

        if (amount > balance) {
            setError('ยอดเงินไม่เพียงพอ');
            return;
        }

        try {
            setLoading(true);
            await api.post<WalletData>(
                '/wallets/withdraw',
                { amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAmount(0);
            fetchWalletData();
            fetchTransactions();
            setError(null);
        } catch (error) {
            console.error('Error withdrawing funds:', error);
            setError('ไม่สามารถถอนเงินได้ กรุณาลองอีกครั้ง');
            setLoading(false);
        }
    };

    const handleQrModalClose = () => {
        setQrModalOpen(false);
        setAmount(0); // Reset amount after modal is closed
        fetchWalletData(); // Update balance after transaction
    };

    const clearError = () => setError(null);

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sans">
            {error && <ErrorAlert error={error} onClose={clearError} />}
            <BalanceCard balance={balance} loading={loading} />
            <TransactionForm
                amount={amount}
                setAmount={setAmount}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
                loading={loading}
            />
            <TransactionHistory transactions={transactions} loading={loading} />
        
            <QRCodeModal 
                isOpen={qrModalOpen}
                onClose={handleQrModalClose}
                amount={amount}
                type={transactionType}
            />
        </div>
    )
}

export default Wallet;