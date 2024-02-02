import express from 'express';
import { TickerRoutes } from '../modules/tickers/tickers.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/tickers',
    route: TickerRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
