import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useConnectOnMount } from './useConnectOnMount'
import { AbstractConnector } from '@web3-react/abstract-connector'
/**
 * A React hook for using individual connectors from web3-react.
 * @param connector web3-react connector
 * @param connectOnMount enable/disable connecting on mount
 * @param storageProvider browser storage (`localStorage`, `sessionStorage` etc)
 */
export function useConnector<T extends AbstractConnector = AbstractConnector>(
  connector: T,
  connectOnMount = true,
  storageProvider?: Storage
) {
  const [storage, setStorage] = useState<Storage>()

  const {
    library: provider,
    activate,
    active: isConnected,
    deactivate,
    chainId,

    account: address,
    error
  } = useWeb3React<T>()

  useEffect(() => {
    if (connectOnMount) {
      setStorage(storageProvider || localStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disconnect = () => {
    if (connectOnMount) storage.removeItem('rk-connect-on-mount')
    return deactivate()
  }

  useConnectOnMount(connector, connectOnMount, storage)

  const connect = async () => {
    if (connectOnMount) storage.setItem('rk-connect-on-mount', 'true')
    return await activate(connector)
  }

  return { provider, connect, isConnected, disconnect, chainId, connector: connector as T, address, error }
}

export type SharedConnectorOptions = Partial<{
  connectOnMount: boolean
  storageProvider: Storage
}>

export type ConnectorContext = ReturnType<typeof useConnector>