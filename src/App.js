import React, { useState } from 'react'
import styled from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import GlobalPage from './pages/GlobalPage'
import TokenPage from './pages/TokenPage'
import PairPage from './pages/PairPage'
import Link from './components/Link'
import { useGlobalData, useGlobalChartData } from './contexts/GlobalData'
import { isAddress } from './utils'
import AccountPage from './pages/AccountPage'
import AllTokensPage from './pages/AllTokensPage'
import AllPairsPage from './pages/AllPairsPage'
import PinnedData from './components/PinnedData'
import { NETWORKS_LIST, ZeroNetworkNetworkInfo } from './constants/networks'
import { useParams } from 'react-router-dom'
import SideNav from './components/SideNav'
import AccountLookup from './pages/AccountLookup'
import Meta from './components/Meta'
import LocalLoader from './components/LocalLoader'
import { useLatestBlocks } from './contexts/Application'
import GoogleAnalyticsReporter from './components/analytics/GoogleAnalyticsReporter'
import { PAIR_BLACKLIST, TOKEN_BLACKLIST } from './constants'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useNetworksData } from './contexts/NetworkData'

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ open }) => (open ? '220px 1fr 200px' : '220px 1fr 64px')};

  @media screen and (max-width: 1400px) {
    grid-template-columns: 220px 1fr;
  }

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
    max-width: 100vw;
    overflow: hidden;
    grid-gap: 0;
  }
`

const Right = styled.div`
  position: fixed;
  right: 0;
  bottom: 0rem;
  z-index: 99;
  width: ${({ open }) => (open ? '220px' : '64px')};
  height: ${({ open }) => (open ? 'fit-content' : '64px')};
  overflow: auto;
  background-color: ${({ theme }) => theme.bg1};
  @media screen and (max-width: 1400px) {
    display: none;
  }
`

const Center = styled.div`
  height: 100%;
  z-index: 9999;
  transition: width 0.25s ease;
  background-color: ${({ theme }) => theme.onlyLight};
`

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const WarningBanner = styled.div`
  background-color: #ff6871;
  padding: 1.5rem;
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

const UrlBanner = styled.div`
  background-color: #ff007a;
  padding: 1rem;
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

const Decorator = styled.span`
  text-decoration: underline;
`

/**
 * Wrap the component with the header and sidebar pinned tab
 */
const LayoutWrapper = ({ children, savedOpen, setSavedOpen }) => {
  const [, updateChain] = useNetworksData()
  const { networkID } = useParams()
  useEffect(() => {
    if (!networkID) {
      updateChain(ZeroNetworkNetworkInfo)
    } else {
      NETWORKS_LIST.map((n) => {
        if (networkID === n.route.toLocaleLowerCase()) {
          updateChain(n)
        }
      })
    }
  }, [networkID, updateChain])
  return (
    <>
      <ContentWrapper open={savedOpen}>
        <Meta />
        <SideNav />
        <Center id="center">{children}</Center>
        <Right open={savedOpen}>
          <PinnedData open={savedOpen} setSavedOpen={setSavedOpen} />
        </Right>
      </ContentWrapper>
    </>
  )
}

const BLOCK_DIFFERENCE_THRESHOLD = 30

function App() {
  const [savedOpen, setSavedOpen] = useState(false)

  const globalData = useGlobalData()
  const globalChartData = useGlobalChartData()
  const [latestBlock, headBlock] = useLatestBlocks()



  // const location = useLocation()
  // const [activeNetwork, setActiveNetwork] = useActiveNetworkVersion()

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setActiveNetwork(ZeroNetworkNetworkInfo)
  //   } else {
  //     SUPPORTED_NETWORK_VERSIONS.map((n) => {
  //       if (location.pathname.includes(n.route.toLocaleLowerCase())) {
  //         setActiveNetwork(n)
  //       }
  //     })
  //   }
  // }, [location.pathname, setActiveNetwork])

  // show warning
  const showWarning = headBlock && latestBlock ? headBlock - latestBlock > BLOCK_DIFFERENCE_THRESHOLD : false

  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        {/* <BannerWrapper>
          <UrlBanner>
            {`info.uniswap.org is being deprecated on June 11th. Explore the new combined V2 and V3 analytics at `}
            <Link color="white" external href={'https://app.uniswap.org/explore'}>
              <Decorator>app.uniswap.org</Decorator>
            </Link>{' '}
          </UrlBanner>
        </BannerWrapper> */}
        {showWarning && (
          <BannerWrapper>
            <WarningBanner>
              {`Warning: The data on this site has only synced to Ethereum block ${latestBlock} (out of ${headBlock}). Please check back soon.`}
            </WarningBanner>
          </BannerWrapper>
        )}
        {globalData &&
          Object.keys(globalData).length > 0 &&
          globalChartData &&
          Object.keys(globalChartData).length > 0 ? (
          <BrowserRouter>
            <Route component={GoogleAnalyticsReporter} />
            <Switch>
              <Route
                exacts
                strict
                path="/:networkID?/token/:tokenAddress"
                render={({ match }) => {
                  if (
                    isAddress(match.params.tokenAddress.toLowerCase()) &&
                    !Object.keys(TOKEN_BLACKLIST).includes(match.params.tokenAddress.toLowerCase())
                  ) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <TokenPage address={match.params.tokenAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              />
              <Route
                exacts
                strict
                path="/:networkID?/pair/:pairAddress"
                render={({ match }) => {
                  if (
                    isAddress(match.params.pairAddress.toLowerCase()) &&
                    !Object.keys(PAIR_BLACKLIST).includes(match.params.pairAddress.toLowerCase())
                  ) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <PairPage pairAddress={match.params.pairAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              />
              <Route
                exacts
                strict
                path="/:networkID?/account/:accountAddress"
                render={({ match }) => {
                  if (isAddress(match.params.accountAddress.toLowerCase())) {
                    return (
                      <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                        <AccountPage account={match.params.accountAddress.toLowerCase()} />
                      </LayoutWrapper>
                    )
                  } else {
                    return <Redirect to="/home" />
                  }
                }}
              />

              <Route path="/:networkID?/home">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <GlobalPage />
                </LayoutWrapper>
              </Route>

              <Route path="/:networkID?/tokens">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <AllTokensPage />
                </LayoutWrapper>
              </Route>

              <Route path="/:networkID?/pairs">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <AllPairsPage />
                </LayoutWrapper>
              </Route>

              <Route path="/:networkID?/accounts">
                <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                  <AccountLookup />
                </LayoutWrapper>
              </Route>

              <Redirect to="/:networkID?/home" />
            </Switch>
          </BrowserRouter>
        ) : (
          <LocalLoader fill="true" />
        )}
      </AppWrapper>
    </ApolloProvider>
  )
}

export default App
