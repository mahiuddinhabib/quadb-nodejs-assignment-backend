import { Prisma, Ticker } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TickerService } from './tickers.service';

const storeTickers = catchAsync(async (req: Request, res: Response) => {
  const result: Prisma.BatchPayload | null = await TickerService.storeTickers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `${result?.count} tickers stored successfully`,
  });
});

const fetchTickers = catchAsync(async (req: Request, res: Response) => {
  const result: Ticker[] | null = await TickerService.fetchTickers();

  sendResponse<Ticker[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Tickers fetched successfully',
    data: result || [],
  });
});

export const TickerController = {
  storeTickers,
  fetchTickers,
};
