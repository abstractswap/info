import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { getSubgraphLink } from '../constants/networks'

// export const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'https://graph-node.internal.reservoir.tools/subgraphs/name/zero/v2-subgraph',
//   }),
//   cache: new InMemoryCache(),
//   shouldBatch: true,
// })

export function client(url) {
  return new ApolloClient({
    link: new HttpLink({
      uri: url ?? getSubgraphLink('zero'),
    }),
    cache: new InMemoryCache(),
    shouldBatch: true,
  })
}



export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const stakingClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/way2rach/talisman',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export function blockClient(url) {
  return new ApolloClient({
    link: new HttpLink({
      uri: url ?? getSubgraphLink('zero', false),
    }),
    cache: new InMemoryCache(),
  })
}
