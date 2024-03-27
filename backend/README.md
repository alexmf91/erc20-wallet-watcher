# Backend - ERC20 Wallet Watcher API

This is the api service for the ERC20 Wallet Watcher, built with NestJS. It provides API endpoints for interacting with Ethereum smart contracts.

## Installation

1. Ensure you have Node.js and Yarn installed.
2. Install dependencies:

   ```bash
   yarn install
   ```

3. Copy `.env.example` to `.env` and fill in your environment variables

4. Start the development server:

   ```bash
   yarn start:dev
   ```

## Structure

- `src/`: Source code including controllers, services, and modules.
- `src/config/`: Configuration files, including environment and swagger configuration.
- `src/modules/`: Modularized code for different domains, e.g., `coins` and `ethers`.

## API Documentation

Swagger API documentation is available at `/api-docs` when the server is running.

## Testing

Run tests using:

```bash
yarn test
```

## Online API Documentation

For a live version of the API documentation, visit [ERC20 Wallet Watcher API Docs](https://erc20-wallet-watcher-xqion.ondigitalocean.app/api-docs).
