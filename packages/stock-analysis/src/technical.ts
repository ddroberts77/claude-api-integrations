import { SMA, EMA, RSI, MACD } from 'technicalindicators';
import { MarketData, TechnicalIndicators } from './types';

export class TechnicalAnalysis {
  async analyze(data: MarketData): Promise<TechnicalIndicators> {
    const prices = data.historicalPrices;
    const closes = prices.map(p => p.close);
    const volumes = prices.map(p => p.volume);

    // Calculate moving averages
    const sma20 = SMA.calculate({ period: 20, values: closes });
    const sma50 = SMA.calculate({ period: 50, values: closes });
    const sma200 = SMA.calculate({ period: 200, values: closes });
    
    const ema12 = EMA.calculate({ period: 12, values: closes });
    const ema26 = EMA.calculate({ period: 26, values: closes });

    // Calculate RSI
    const rsi = RSI.calculate({
      period: 14,
      values: closes
    });

    // Calculate MACD
    const macd = MACD.calculate({
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      values: closes
    });

    // Volume analysis
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const volChange = (volumes[volumes.length - 1] / avgVolume - 1) * 100;

    // Price momentum
    const momentum = closes[closes.length - 1] - closes[closes.length - 10];
    const momentumPct = (momentum / closes[closes.length - 10]) * 100;

    // Support and resistance levels
    const levels = this.calculateSupportResistance(closes);

    // Trend analysis
    const trend = this.analyzeTrend({
      price: closes[closes.length - 1],
      sma20: sma20[sma20.length - 1],
      sma50: sma50[sma50.length - 1],
      sma200: sma200[sma200.length - 1]
    });

    return {
      movingAverages: {
        sma20: sma20[sma20.length - 1],
        sma50: sma50[sma50.length - 1],
        sma200: sma200[sma200.length - 1],
        ema12: ema12[ema12.length - 1],
        ema26: ema26[ema26.length - 1]
      },
      rsi: rsi[rsi.length - 1],
      macd: {
        line: macd[macd.length - 1].MACD,
        signal: macd[macd.length - 1].signal,
        histogram: macd[macd.length - 1].histogram
      },
      volume: {
        current: volumes[volumes.length - 1],
        average: avgVolume,
        change: volChange
      },
      momentum: {
        absolute: momentum,
        percentage: momentumPct
      },
      supportResistance: levels,
      trend
    };
  }

  private calculateSupportResistance(prices: number[]) {
    // Find local minima and maxima
    const levels = [];
    const window = 20;

    for (let i = window; i < prices.length - window; i++) {
      const current = prices[i];
      const leftPrices = prices.slice(i - window, i);
      const rightPrices = prices.slice(i + 1, i + window + 1);

      // Check for local maximum (resistance)
      if (current > Math.max(...leftPrices) && current > Math.max(...rightPrices)) {
        levels.push({ price: current, type: 'resistance' });
      }

      // Check for local minimum (support)
      if (current < Math.min(...leftPrices) && current < Math.min(...rightPrices)) {
        levels.push({ price: current, type: 'support' });
      }
    }

    return levels;
  }

  private analyzeTrend(indicators: {
    price: number,
    sma20: number,
    sma50: number,
    sma200: number
  }) {
    const { price, sma20, sma50, sma200 } = indicators;

    // Short-term trend
    const shortTerm = price > sma20 ? 'bullish' : 'bearish';

    // Medium-term trend
    const mediumTerm = price > sma50 ? 'bullish' : 'bearish';

    // Long-term trend
    const longTerm = price > sma200 ? 'bullish' : 'bearish';

    // Overall trend strength
    let strength = 0;
    if (price > sma20) strength++;
    if (price > sma50) strength++;
    if (price > sma200) strength++;
    if (sma20 > sma50) strength++;
    if (sma50 > sma200) strength++;

    return {
      shortTerm,
      mediumTerm,
      longTerm,
      strength: strength / 5 // Normalize to 0-1
    };
  }
}