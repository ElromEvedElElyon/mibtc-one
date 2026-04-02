# miBTC One — Bitcoin Runes Micro-Payment Gateway

The first purpose-built micro-Bitcoin payment system using the Runes protocol on Bitcoin.

## Features

- **Runes-Native Payments** — Built directly on Bitcoin Runes protocol. No bridges.
- **Micro-Payment Optimized** — Send payments as small as 1 miBTC (0.001 BTC)
- **Developer SDK** — TypeScript SDK with 12 tools. 5 lines to integrate.
- **AI Agent Compatible** — MCP server for autonomous payment processing
- **Merchant Dashboard** — Real-time analytics, Stripe-like UX
- **Multi-Wallet Support** — Xverse, Unisat, Phantom, OKX Wallet

## Quick Start

```bash
npm install mibtc-one
```

```typescript
import { MiBTCPay } from 'mibtc-one';

const pay = new MiBTCPay({
  merchantId: 'your-id',
  network: 'mainnet'
});

const invoice = await pay.createInvoice({
  amount: 100,
  currency: 'MIBTC',
  description: 'Premium access',
  callbackUrl: 'https://your.api/webhook'
});
```

## Pricing

| Plan | Price | Transactions | Fee |
|------|-------|-------------|-----|
| Starter | Free | 10/month | 1% |
| Pro | $29.99/mo | 500/month | 0.5% |
| Enterprise | $99.99/mo | Unlimited | 0.3% |

## Ecosystem

Built on battle-tested Bitcoin infrastructure:

- **Hiro Runes API** — Real-time balance and transaction tracking
- **OrdinalsBot** — Etching, minting, and trading
- **Lightning Bridge** — Optional sub-second micro-payments
- **QuickNode** — Managed indexer infrastructure

## Links

- **Live**: [elromevedelelyon.github.io/mibtc-one](https://elromevedelelyon.github.io/mibtc-one/)
- **Flash Payment System**: [elromevedelelyon.github.io/flash-payment-system](https://elromevedelelyon.github.io/flash-payment-system/)
- **Company**: Padrao Bitcoin (CNPJ 51.148.891/0001-69)

## Payment

- **PayPal**: [paypal.me/PadraoBitcoin](https://www.paypal.com/paypalme/PadraoBitcoin)
- **BTC**: `bc1qdj3flkqe7v3qwlfux5d5u3rja7ldm9gwywk9t2`
- **SOL**: `CM42ofAFowySg72GjDuCchEkwwbwnhdSRYgztRCAAEzR`
- **ETH**: `0x6b45b26e1d59A832FE8c9E7c685C36Ea54A3F88B`

## License

MIT — Padrao Bitcoin 2026
