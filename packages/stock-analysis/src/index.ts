import { Configuration, OpenAIApi } from 'openai';
import { StockAnalyzer } from './analyzer';
import { DataFetcher } from './data-fetcher';
import { TechnicalAnalysis } from './technical';
import { FundamentalAnalysis } from './fundamental';
import { logger } from '../shared/utils/logger';

export class StockPickingAI {
  private claude: OpenAIApi;
  private analyzer: StockAnalyzer;
  private dataFetcher: DataFetcher;
  private technical: TechnicalAnalysis;
  private fundamental: FundamentalAnalysis;

  constructor(apiKey: string) {
    this.claude = new OpenAIApi(new Configuration({ apiKey }));
    this.analyzer = new StockAnalyzer(this.claude);
    this.dataFetcher = new DataFetcher();
    this.technical = new TechnicalAnalysis();
    this.fundamental = new FundamentalAnalysis();
  }

  async analyzeStock(symbol: string) {
    try {
      // Fetch market data
      const marketData = await this.dataFetcher.getMarketData(symbol);
      const fundamentalData = await this.dataFetcher.getFundamentalData(symbol);
      
      // Perform technical analysis
      const technicalIndicators = await this.technical.analyze(marketData);
      
      // Perform fundamental analysis
      const fundamentalMetrics = await this.fundamental.analyze(fundamentalData);
      
      // Get AI recommendation
      const recommendation = await this.analyzer.generateRecommendation({
        symbol,
        marketData,
        technicalIndicators,
        fundamentalMetrics
      });

      return {
        symbol,
        recommendation,
        technical: technicalIndicators,
        fundamental: fundamentalMetrics,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Error analyzing stock ${symbol}:`, error);
      throw new Error(`Failed to analyze stock ${symbol}`);
    }
  }

  async screenStocks(criteria: any) {
    try {
      // Get list of stocks matching initial criteria
      const candidates = await this.dataFetcher.screenStocks(criteria);
      
      // Analyze each candidate
      const analyses = await Promise.all(
        candidates.map(symbol => this.analyzeStock(symbol))
      );
      
      // Sort and filter based on analysis results
      const recommendations = analyses
        .filter(analysis => analysis.recommendation.confidence > 0.7)
        .sort((a, b) => b.recommendation.score - a.recommendation.score);

      return recommendations;

    } catch (error) {
      logger.error('Error screening stocks:', error);
      throw new Error('Failed to screen stocks');
    }
  }

  async backtest(strategy: any, timeframe: any) {
    try {
      const results = await this.analyzer.backtest(strategy, timeframe);
      return {
        strategy,
        timeframe,
        results,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error running backtest:', error);
      throw new Error('Failed to run backtest');
    }
  }

  async optimizePortfolio(holdings: any, constraints: any) {
    try {
      // Get current market data for holdings
      const marketData = await Promise.all(
        holdings.map(h => this.dataFetcher.getMarketData(h.symbol))
      );

      // Run portfolio optimization
      const optimization = await this.analyzer.optimizePortfolio({
        holdings,
        marketData,
        constraints
      });

      return {
        currentHoldings: holdings,
        recommendedChanges: optimization.changes,
        expectedMetrics: optimization.metrics,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      logger.error('Error optimizing portfolio:', error);
      throw new Error('Failed to optimize portfolio');
    }
  }
}