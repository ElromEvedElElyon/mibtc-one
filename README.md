# miBTC One — Bitcoin Runes Micro-Payment Gateway

[![npm version](https://img.shields.io/npm/v/mibtc-one?color=f7931a&label=npm)](https://www.npmjs.com/package/mibtc-one)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-Runes_Protocol-f7931a?logo=bitcoin)](https://elromevedelelyon.github.io/mibtc-one/)
[![GitHub Pages](https://img.shields.io/badge/Live-GitHub_Pages-4a9eff)](https://elromevedelelyon.github.io/mibtc-one/)

The first purpose-built micro-Bitcoin payment system using the Runes protocol on Bitcoin. Accept BTC micro-payments with 0.5% fees, instant settlement, and a TypeScript SDK designed for merchants, developers, and AI agents.

## Quick Installation

```bash
npm install mibtc-one
```

## Code Example

```typescript
import { MiBTCPay } from 'mibtc-one';

const pay = new MiBTCPay({
  merchantId: 'your-merchant-id',
  network: 'mainnet',
  apiKey: 'your-api-key',
  webhookSecret: 'your-webhook-secret'
});

// Create a payment invoice
const invoice = await pay.createInvoice({
  amount: 100,        // 100 miBTC = 0.1 BTC
  currency: 'MIBTC',
  description: 'Premium access — 30 days',
  callbackUrl: 'https://your.api/webhook',
  expiresIn: 3600     // seconds
});

// invoice.qrCode  — display to user
// invoice.paymentAddress — BTC Runes address
// invoice.id      — poll or receive webhook

// Convert units
const sats = MiBTCPay.convert(100, 'MIBTC', 'SATS'); // 10_000_000
const btc  = MiBTCPay.convert(100, 'MIBTC', 'BTC');  // 0.1

// Generate shareable payment link
const link = MiBTCPay.paymentLink(invoice.id);
// https://pay.mibtc.one/<invoice-id>
```

## Features

- **Runes-Native Payments** — Built directly on Bitcoin Runes protocol. No bridges, no wrapping, no Layer 2 trust assumptions.
- **Micro-Payment Optimized** — Send payments as small as 1 miBTC (0.001 BTC). Ideal for subscriptions, tips, and pay-per-use APIs.
- **Developer SDK** — TypeScript/JavaScript SDK with 12 tools and full type definitions. Five lines to integrate.
- **AI Agent Compatible** — MCP server integration for autonomous payment processing in AI agent workflows.
- **Merchant Dashboard** — Real-time analytics, payment history, conversion tracking, and settlement reports.
- **Multi-Wallet Support** — Xverse, Unisat, Phantom Bitcoin, OKX Wallet, and hardware wallets.
- **Webhook Verification** — HMAC-SHA256 signed webhook events for secure server-side confirmation.
- **Unit Conversion** — Built-in `MiBTCPay.convert()` for BTC / miBTC / SATS conversions.

## API Reference

### `new MiBTCPay(config)`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `merchantId` | `string` | Yes | Your merchant identifier |
| `network` | `'mainnet' \| 'testnet'` | Yes | Target network |
| `apiKey` | `string` | No | API key for authenticated endpoints |
| `webhookSecret` | `string` | No | Secret for webhook signature verification |

### `pay.createInvoice(params): Promise<Invoice>`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | Payment amount in specified currency |
| `currency` | `'MIBTC' \| 'SATS' \| 'BTC'` | Yes | Payment denomination |
| `description` | `string` | Yes | Human-readable payment description |
| `callbackUrl` | `string` | No | Webhook URL for payment confirmation |
| `expiresIn` | `number` | No | Invoice TTL in seconds (default: 3600) |
| `metadata` | `Record<string, string>` | No | Arbitrary key-value pairs |

### `pay.getInvoice(invoiceId): Promise<Invoice>`

Fetch current invoice status. Returns `pending`, `paid`, `expired`, or `cancelled`.

### `pay.cancelInvoice(invoiceId): Promise<void>`

Cancel a pending invoice before it expires.

### `pay.getBalances(): Promise<RuneBalance[]>`

Return all Rune balances for the merchant account.

### `pay.getTransactions(limit?, offset?): Promise<Transaction[]>`

List recent transactions. Default `limit` is 20.

### `pay.getTransaction(txid): Promise<Transaction>`

Get a specific transaction by Bitcoin transaction ID.

### `pay.createPayout(params): Promise<PayoutResult>`

Initiate a payout to a Bitcoin address.

| Parameter | Type | Description |
|-----------|------|-------------|
| `address` | `string` | Destination Bitcoin address |
| `amount` | `number` | Payout amount |
| `currency` | `'MIBTC' \| 'SATS' \| 'BTC'` | Payout denomination |

### `pay.verifyWebhook(payload, signature): boolean`

Verify the HMAC-SHA256 signature of an incoming webhook event. Requires `webhookSecret` in config.

### `pay.getExchangeRate(): Promise<{ btcUsd: number; miBtcSats: number }>`

Return current BTC/USD rate and miBTC-to-SATS conversion rate.

### `MiBTCPay.convert(amount, from, to): number` (static)

Convert between `BTC`, `MIBTC`, and `SATS`.

```typescript
MiBTCPay.convert(1, 'BTC', 'SATS');    // 100_000_000
MiBTCPay.convert(1, 'BTC', 'MIBTC');   // 1000
MiBTCPay.convert(500, 'MIBTC', 'BTC'); // 0.5
```

### `MiBTCPay.paymentLink(invoiceId): string` (static)

Return the hosted payment page URL for a given invoice ID.

### `pay.dashboardUrl(): string`

Return the merchant dashboard URL for the configured merchant account.

## Pricing Tiers

| Plan | Price | Transactions | Fee |
|------|-------|-------------|-----|
| Starter | Free | 10 / month | 1% |
| Pro | $29.99 / mo | 500 / month | 0.5% |
| Enterprise | $99.99 / mo | Unlimited | 0.3% |

## Ecosystem

Built on battle-tested Bitcoin infrastructure:

- **Hiro Runes API** — Real-time balance and transaction tracking
- **OrdinalsBot** — Etching, minting, and trading
- **Lightning Bridge** — Optional sub-second micro-payments
- **QuickNode** — Managed indexer infrastructure

## Links

- **Live site**: [elromevedelelyon.github.io/mibtc-one](https://elromevedelelyon.github.io/mibtc-one/)
- **GitHub**: [github.com/ElromEvedElElyon/mibtc-one](https://github.com/ElromEvedElElyon/mibtc-one)
- **Flash Payment System**: [elromevedelelyon.github.io/flash-payment-system](https://elromevedelelyon.github.io/flash-payment-system/)
- **Company**: Padrao Bitcoin — CNPJ 51.148.891/0001-69
- **Contact**: standardbitcoin.io@gmail.com

## Donations

If miBTC One saves you development time, consider supporting continued development:

- **PayPal**: [paypal.me/PadraoBitcoin](https://www.paypal.com/paypalme/PadraoBitcoin)
- **BTC**: `bc1qdj3flkqe7v3qwlfux5d5u3rja7ldm9gwywk9t2`
- **SOL**: `CM42ofAFowySg72GjDuCchEkwwbwnhdSRYgztRCAAEzR`
- **ETH**: `0x6b45b26e1d59A832FE8c9E7c685C36Ea54A3F88B`

## License

MIT — Padrao Bitcoin 2026
