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
  const installed =
    typeof window !== 'undefined' &&
    //@ts-ignore
    typeof window?.xfi !== 'undefined' &&
    //@ts-ignore
    (window.xfi?.ethereum as any).isXDEFI === true;

  return {
    id: 'xdefi',
    name: 'XDEFI Wallet',
    installed,
    iconUrl: async () => (await import('./xdefiWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: {
          shimDisconnect,
          getProvider: () =>
            //@ts-ignore
            installed ? (window.xfi?.ethereum as any) : undefined,
        },
      }),
    }),
  };
};
