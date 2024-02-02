import { Prisma, Ticker } from '@prisma/client';
import prisma from '../../../shared/prisma';

const storeTickers = async (): Promise<Prisma.BatchPayload | null> => {
  const response = await fetch('https://api.wazirx.com/api/v2/tickers');
  const data = await response.json();

  // Get top 10 based on the last value
  const top10Tickers = Object.values(data)
    .sort((a: any, b: any) => b.last - a.last)
    .slice(0, 10)
    .map((ticker: any) => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

  // transaction ensures that previous tickers will be deleted only if new tickers is created
  const createdTickers = await prisma.$transaction(async trx => {
    await trx.ticker.deleteMany({});
    const newTickers = await trx.ticker.createMany({
      data: top10Tickers,
    });

    return newTickers;
  });
  return createdTickers;
};

const fetchTickers = async (): Promise<Ticker[] | null> => {
  const Tickers = await prisma.ticker.findMany();
  return Tickers;
};

export const TickerService = {
  storeTickers,
  fetchTickers,
};
