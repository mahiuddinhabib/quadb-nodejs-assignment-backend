import { z } from 'zod';

const tickerZodSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  last: z.string({ required_error: "Last is required" }),
  buy: z.string({ required_error: "Buy is required" }),
  sell: z.string({ required_error: "Sell is required" }),
  volume: z.string({ required_error: "Volume is required" }),
  base_unit: z.string({ required_error: "Base unit is required" }),
});

export const TickerValidation = {
  tickerZodSchema,
};
