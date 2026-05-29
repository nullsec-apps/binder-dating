import { useState, useCallback, useEffect } from 'react';

const STORE_KEY = 'binder_wallet';

function loadStored() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function useWallet() {
  const [state, setState] = useState(() => loadStored() || { connected: false, address: undefined, basename: null });
  const [chainId, setChainId] = useState(8453);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const connect = useCallback(() => {
    const hex = '0123456789abcdef';
    let addr = '0x';
    for (let i = 0; i < 40; i++) addr += hex[Math.floor(Math.random() * 16)];
    setState({ connected: true, address: addr, basename: 'you.base.eth' });
  }, []);

  const disconnect = useCallback(() => {
    setState({ connected: false, address: undefined, basename: null });
  }, []);

  const forceBaseNetwork = useCallback(() => setChainId(8453), []);

  return {
    address: state.address as string | undefined,
    isConnected: state.connected as boolean,
    basename: state.basename as string | null,
    balance: 0.4213,
    chainId,
    connect,
    disconnect,
    forceBaseNetwork,
    setChainId,
  };
}
