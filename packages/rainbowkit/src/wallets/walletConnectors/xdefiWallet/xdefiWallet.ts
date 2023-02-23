/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface XDEFIWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const xdefiWallet = ({
  chains,
  shimDisconnect,
}: XDEFIWalletOptions): Wallet => {
  return {
    id: 'xdefi',
    name: 'XDEFI Wallet',
    installed:
      typeof window !== 'undefined' &&
      (window.ethereum as any)?.isXDEFI === true,
    iconUrl: async () => (await import('./xdefiWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
    }),
  };
};
