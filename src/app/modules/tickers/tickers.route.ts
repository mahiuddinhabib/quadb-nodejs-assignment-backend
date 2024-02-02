import express from 'express';
import { TickerController } from './tickers.controller';
const router = express.Router();

router.get("/store-tickers", TickerController.storeTickers);

router.get("/fetch-tickers", TickerController.fetchTickers);

export const TickerRoutes = router;
