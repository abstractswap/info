import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import { NETWORKS_LIST, ZeroNetworkNetworkInfo } from '../constants/networks'

const UPDATE_CHAIN = 'UPDATE_CHAIN'

const INITIAL_STATE = {
  activeNetwork: ZeroNetworkNetworkInfo,
}

const NetworkDataContext = createContext()

function useNetworksDataContext() {
  return useContext(NetworkDataContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_CHAIN: {
      const { newChain } = payload
      const newNetworkData = NETWORKS_LIST.find(network => network.chainId === newChain.chainId)
      return {
        ...state,
        activeNetwork: newNetworkData ? newNetworkData : INITIAL_STATE.activeNetwork,
      }
    }

    default: {
      throw Error(`Unexpected acttion: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const updateActiveNetwork = useCallback(newChain => {
    console.log("updating")
    dispatch({
      type: UPDATE_CHAIN,
      payload: {
        newChain,
      },
    })
  }, [])

  return (
    <NetworkDataContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateActiveNetwork,
          },
        ],
        [state, updateActiveNetwork]
      )}
    >
      {children}
    </NetworkDataContext.Provider>
  )
}

export function useNetworksData() {
  const [{ activeNetwork }, { updateActiveNetwork }] = useNetworksDataContext()
  return [activeNetwork ?? NETWORKS_LIST[0], updateActiveNetwork]
}
