import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import { NETWORKS_LIST, ZeroNetworkNetworkInfo } from '../constants/networks'

const UPDATE_CHAIN = 'UPDATE_CHAIN'

const INITIAL_STATE = {
  networksData: [ZeroNetworkNetworkInfo],
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
        networksData: newNetworkData ? [newNetworkData] : INITIAL_STATE.networksData,
      }
    }

    default: {
      throw Error(`Unexpected acttion: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const updateChain = useCallback(newChain => {
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
            updateChain,
          },
        ],
        [state, updateChain]
      )}
    >
      {children}
    </NetworkDataContext.Provider>
  )
}

export function useNetworksData() {
  const [{ networksData }, { updateChain }] = useNetworksDataContext()
  return [networksData.filter(Boolean).length ? networksData : [NETWORKS_LIST[0]], updateChain]
}
