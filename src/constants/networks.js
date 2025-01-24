import ABSTRACT_LOGO_URL from '../assets/images/abstract-logo.png'
import ZERO_LOGO_URL from '../assets/images/zero-logo.png'
import BOB_LOGO_URL from '../assets/images/bob-logo.png'
import CYBER_LOGO_URL from '../assets/images/cyber-logo.png'
import SHAPE_LOGO_URL from '../assets/images/shape-logo.png'
import REDSTONE_LOGO_URL from '../assets/images/redstone-logo.svg'
import REDSTONE_GARNET_LOGO_URL from '../assets/images/redstone-garnet-logo.png'
import INK_LOGO_URL from '../assets/images/ink-logo.png'

export function getSubgraphLink(chainSlug, isV2 = true) {
    return `https://graph-node.internal.reservoir.tools/subgraphs/name/${chainSlug}/${isV2 ? 'v2' : 'blocks'}-subgraph`
}


export const START_BLOCKS = {
    //ChainID : block
    11124: 356725,
    543210: 727,
    60808: 5188280,
    7560: 9567951,
    360: 6022152,
    690: 924516,
    17069: 586081,
    57073: 284117,
}

export const AbstractTestnetNetworkInfo = {
    chainId: 11124,
    id: 11124,
    route: 'abstract-testnet',
    name: 'Abstract Testnet',
    bgColor: '#00DE73',
    primaryColor: '#07C983',
    secondaryColor: '#2172E5',
    client: getSubgraphLink('absctract-testnet'),
    blockClient: getSubgraphLink('absctract-testnet', false),
    imageURL: ABSTRACT_LOGO_URL,
    startTimestamp: 1620201600,

}

export const ZeroNetworkNetworkInfo = {
    chainId: 543210,
    id: 543210,
    route: 'zero',
    name: 'Zero Mainnet',
    bgColor: '#0052ff',
    primaryColor: '#0052ff',
    secondaryColor: '#0052ff',
    client: getSubgraphLink('zero'),
    blockClient: getSubgraphLink('zero', false),
    imageURL: ZERO_LOGO_URL,
    startTimestamp: 1620201600,
}

export const BobNetworkNetworkInfo = {
    chainId: 60808,
    id: 60808,
    route: 'bob',
    name: 'Bob',
    bgColor: '#fff',
    primaryColor: '#f45d00',
    secondaryColor: '#fff',
    client: getSubgraphLink('bob'),
    blockClient: getSubgraphLink('bob', false),
    imageURL: BOB_LOGO_URL,
    startTimestamp: 1620201600,
}

export const CyberNetworkNetworkInfo = {
    chainId: 7560,
    id: 7560,
    route: 'cyber',
    name: 'Cyber',
    bgColor: '#fff',
    primaryColor: '#08dc10',
    secondaryColor: '#fff',
    client: getSubgraphLink('cyber'),
    blockClient: getSubgraphLink('cyber', false),
    imageURL: CYBER_LOGO_URL,
    startTimestamp: 1620201600,
}

export const ShapeNetworkNetworkInfo = {
    chainId: 360,
    id: 360,
    route: 'shape',
    name: 'Shape',
    bgColor: '#222',
    primaryColor: '#222',
    secondaryColor: '#fff',
    client: getSubgraphLink('shape'),
    blockClient: getSubgraphLink('shape', false),
    imageURL: SHAPE_LOGO_URL,
    startTimestamp: 1620201600,
}

export const RedstoneNetworkInfo = {
    chainId: 690,
    id: 690,
    route: 'redstone',
    name: 'Redstone',
    bgColor: '#F01B36',
    primaryColor: '#F01B36',
    secondaryColor: '#FB7876',
    client: getSubgraphLink('redstone'),
    blockClient: getSubgraphLink('redstone', false),
    imageURL: REDSTONE_LOGO_URL,
    startTimestamp: 1620201600,
}

export const RedstoneGarnetNetworkInfo = {
    chainId: 17069,
    id: 17069,
    route: 'garnet-holesky',
    name: 'Garnet Holesky',
    bgColor: '#F01B36',
    primaryColor: '#F01B36',
    secondaryColor: '#FB7876',
    client: getSubgraphLink('redstone-garnet'),
    blockClient: getSubgraphLink('redstone-garnet', false),
    imageURL: REDSTONE_GARNET_LOGO_URL,
    startTimestamp: 1620201600,
}

export const InkNetworkInfo = {
    chainId: 57073,
    id: 57073,
    route: 'ink',
    name: 'ink',
    bgColor: '#0052ff',
    primaryColor: '#0052ff',
    secondaryColor: '#0052ff',
    client: getSubgraphLink('ink'),
    blockClient: getSubgraphLink('ink', false),
    imageURL: INK_LOGO_URL,
    startTimestamp: 1620201600,
}

export const AbstractNetworkInfo = {
    chainId: 2741,
    id: 2741,
    route: '',
    name: 'Abstract',
    bgColor: '#00DE73',
    primaryColor: '#07C983',
    secondaryColor: '#2172E5',
    imageURL: ABSTRACT_LOGO_URL,
    client: getSubgraphLink('abstract'),
    blockClient: getSubgraphLink('abstract', false),
    startTimestamp: 1620201600,
}



export const SUPPORTED_NETWORK_VERSIONS = [
    AbstractTestnetNetworkInfo,
    ZeroNetworkNetworkInfo,
    // BobNetworkNetworkInfo,
    CyberNetworkNetworkInfo,
    ShapeNetworkNetworkInfo,
    // RedstoneNetworkInfo,
    // RedstoneGarnetNetworkInfo,
    InkNetworkInfo,
    AbstractNetworkInfo,
]

export const NETWORKS_LIST = Object.values(SUPPORTED_NETWORK_VERSIONS)
export const SUPPORTED_NETWORKS = Object.keys(SUPPORTED_NETWORK_VERSIONS).map(Number)

