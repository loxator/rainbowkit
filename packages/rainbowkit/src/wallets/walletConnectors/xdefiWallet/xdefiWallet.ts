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
    typeof window.ethereum !== 'undefined' &&
    ((window.ethereum as any).isXDEFI === true ||
      window.ethereum.providers?.find((p: any) => p.isXDEFI === true));

  return {
    id: 'xdefi',
    name: 'XDEFI Wallet',
    installed: !!installed,
    iconUrl: async () => (await import('./xdefiWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      browserExtension:
        'https://install.xdefi.io/?utm_source=rainbowKit&utm_medium=organic&utm_campaign=xdefi.io&utm_id=xdefi.io',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
    }),
  };
};
