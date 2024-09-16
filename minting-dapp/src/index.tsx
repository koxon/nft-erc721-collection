// import '@rainbow-me/rainbowkit/styles.css';

import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// import {
//   getDefaultWallets,
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
// import {
//   chain,
//   configureChains,
//   createClient,
//   WagmiConfig,
// } from 'wagmi';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';

// const { chains, provider } = configureChains(
//   [chain.mainnet, chain.goerli],
//   [
//     // alchemyProvider({ apiKey: (process.env.ALCHEMY_API_KEY as string) }),
//     publicProvider()
//   ]
// );

// console.log(process.env.ALCHEMY_API_KEY);

// const { connectors } = getDefaultWallets({
//   appName: 'The Fry Heads',
//   chains
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// })

// document.addEventListener('DOMContentLoaded', async () => {
//   ReactDOM.render(
//     // <WagmiConfig client={wagmiClient}>
//     //   <RainbowKitProvider chains={chains}>
//     <Dapp />,
//     //   </RainbowKitProvider>
//     // </WagmiConfig>,
//     document.getElementById('minting-dapp')
//   );
// });

const root = ReactDOM.createRoot(
  document.getElementById('minting-dapp') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
