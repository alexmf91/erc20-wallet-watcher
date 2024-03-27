# Frontend - ERC20 Wallet Watcher

This is the React-based frontend for the ERC20 Wallet Watcher. It provides a user interface for interacting with ERC20 tokens through the backend service.

## Installation

1. Ensure you have Node.js and Yarn installed.
2. Install dependencies:

```bash
yarn install
```

3. Copy `.env.example` to `.env` and fill in your environment variables

4. Start the development server:

```bash
yarn dev
```

## Structure

- `src/`: Source code including components, pages, and hooks.
- `src/components/`: Reusable components.
- `src/pages/`: Page components for routing.
- `src/utils/`: Utility functions.

## Styling

This project uses TailwindCSS for styling.

## Blockchain Interaction

This project integrates with Ethereum blockchain using wagmi, viem, and ConnectKit to provide a seamless experience in interacting with ERC20 tokens.

## Live Version

Experience the live version of the app at [ERC20 Wallet Watcher](https://erc20-wallet-watcher.vercel.app).
