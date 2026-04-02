/**
 * miBTC One — Bitcoin Runes Micro-Payment Gateway SDK
 * The first purpose-built micro-Bitcoin payment system using the Runes protocol.
 *
 * @packageDocumentation
 */

export interface MiBTCConfig {
  merchantId: string;
  network: 'mainnet' | 'testnet';
  apiKey?: string;
  webhookSecret?: string;
}

export interface InvoiceParams {
  amount: number;
  currency: 'MIBTC' | 'SATS' | 'BTC';
  description: string;
  callbackUrl?: string;
  expiresIn?: number;
  metadata?: Record<string, string>;
}

export interface Invoice {
  id: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  amount: number;
  currency: string;
  runeId: string;
  paymentAddress: string;
  qrCode: string;
  createdAt: string;
  expiresAt: string;
}

export interface RuneBalance {
  runeId: string;
  name: string;
  symbol: string;
  amount: string;
  divisibility: number;
}

export interface Transaction {
  txid: string;
  status: 'confirmed' | 'pending' | 'failed';
  amount: number;
  currency: string;
  from: string;
  to: string;
  blockHeight?: number;
  confirmations: number;
  timestamp: string;
}

export interface PayoutParams {
  address: string;
  amount: number;
  currency: 'MIBTC' | 'SATS' | 'BTC';
}

export interface PayoutResult {
  id: string;
  txid: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  fee: number;
}

export interface WebhookEvent {
  type: 'invoice.paid' | 'invoice.expired' | 'payout.completed' | 'payout.failed';
  invoiceId?: string;
  payoutId?: string;
  data: Record<string, unknown>;
  timestamp: string;
  signature: string;
}

const MIBTC_API = 'https://api.mibtc.one';

export class MiBTCPay {
  private config: MiBTCConfig;
  private baseUrl: string;

  constructor(config: MiBTCConfig) {
    if (!config.merchantId) throw new Error('merchantId is required');
    if (!config.network) throw new Error('network is required');
    this.config = config;
    this.baseUrl = config.network === 'mainnet' ? MIBTC_API : `${MIBTC_API}/testnet`;
  }

  /**
   * Create a payment invoice for receiving miBTC/Runes payments.
   */
  async createInvoice(params: InvoiceParams): Promise<Invoice> {
    const response = await fetch(`${this.baseUrl}/v1/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error(`Invoice creation failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Get invoice status by ID.
   */
  async getInvoice(invoiceId: string): Promise<Invoice> {
    const response = await fetch(`${this.baseUrl}/v1/invoices/${invoiceId}`, {
      headers: {
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`Invoice fetch failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Cancel a pending invoice.
   */
  async cancelInvoice(invoiceId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v1/invoices/${invoiceId}/cancel`, {
      method: 'POST',
      headers: {
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`Invoice cancel failed: ${response.statusText}`);
  }

  /**
   * Get Rune balances for the merchant account.
   */
  async getBalances(): Promise<RuneBalance[]> {
    const response = await fetch(`${this.baseUrl}/v1/balances`, {
      headers: {
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`Balance fetch failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * List recent transactions.
   */
  async getTransactions(limit = 20, offset = 0): Promise<Transaction[]> {
    const response = await fetch(
      `${this.baseUrl}/v1/transactions?limit=${limit}&offset=${offset}`,
      {
        headers: {
          'X-Merchant-Id': this.config.merchantId,
          ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
        },
      }
    );
    if (!response.ok) throw new Error(`Transaction fetch failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Get a specific transaction by txid.
   */
  async getTransaction(txid: string): Promise<Transaction> {
    const response = await fetch(`${this.baseUrl}/v1/transactions/${txid}`, {
      headers: {
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
    });
    if (!response.ok) throw new Error(`Transaction fetch failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Initiate a payout to a Bitcoin address.
   */
  async createPayout(params: PayoutParams): Promise<PayoutResult> {
    const response = await fetch(`${this.baseUrl}/v1/payouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Id': this.config.merchantId,
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error(`Payout creation failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Verify a webhook signature.
   */
  verifyWebhook(payload: string, signature: string): boolean {
    if (!this.config.webhookSecret) throw new Error('webhookSecret not configured');
    // HMAC-SHA256 verification
    const crypto = require('crypto');
    const expected = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  }

  /**
   * Get current BTC/miBTC exchange rate.
   */
  async getExchangeRate(): Promise<{ btcUsd: number; miBtcSats: number }> {
    const response = await fetch(`${this.baseUrl}/v1/rates`);
    if (!response.ok) throw new Error(`Rate fetch failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Convert between miBTC, SATS, and BTC.
   */
  static convert(amount: number, from: 'MIBTC' | 'SATS' | 'BTC', to: 'MIBTC' | 'SATS' | 'BTC'): number {
    const sats: Record<string, number> = { BTC: 100_000_000, MIBTC: 100_000, SATS: 1 };
    return (amount * sats[from]) / sats[to];
  }

  /**
   * Generate a payment link for easy sharing.
   */
  static paymentLink(invoiceId: string): string {
    return `https://pay.mibtc.one/${invoiceId}`;
  }

  /**
   * Get merchant dashboard URL.
   */
  dashboardUrl(): string {
    return `https://dashboard.mibtc.one/${this.config.merchantId}`;
  }
}

export default MiBTCPay;
