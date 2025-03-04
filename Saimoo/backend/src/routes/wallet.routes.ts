import { Router } from 'express';

import * as WalletController from '../controllers/wallet.controller';

const router = Router();

router.get('/', WalletController.getWallet);
router.post('/topup', WalletController.topup);
router.post('/withdraw', WalletController.withdraw);
router.get('/transaction', WalletController.getWalletTransactions);

export default router;