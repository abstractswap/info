import React, { useState, useRef } from 'react'
import { ChevronDown } from 'react-feather'
import styled from 'styled-components'
import { useNetworksData } from '../../contexts/NetworkData'
import { NETWORKS_LIST, ZeroNetworkNetworkInfo } from '../../constants/networks'
import { Link } from 'react-router-dom'
import { Box } from 'rebass/styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Text } from 'rebass'
import { AutoColumn } from '../Column'

const Container = styled.div`
  position: relative;
  z-index: 40;
`

const Row = styled(Box)`
    width: ${({ width }) => width ?? '100%'};
    display: flex;
    padding: 0;
    align-items: ${({ align }) => align ?? 'center'};
    justify-content: ${({ justify }) => justify ?? 'flex-start'};
    padding: ${({ padding }) => padding};
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
    gap: ${({ gap }) => gap};
  `

const RowBetween = styled(Row)`
  justify-content: space-between;
`
const RowFixed = styled(Row)`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

const Wrapper = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bg1};
  padding: 6px 8px;
  margin-right: 12px;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const LogaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const LogoWrapper = styled.img`
  width: 20px;
  height: 20px;
`

const FlyOut = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  position: absolute;
  top: 40px;
  left: 0;
  border-radius: 12px;
  padding: 16px;
  width: 270px;
`

const NetworkRow = styled(RowBetween)`
  padding: 6px 8px;
  border-radius: 8px;
  opacity: ${({ disabled }) => (disabled ? '0.5' : 1)};
  :hover {
    cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.7)};
  }
`

const Badge = styled.div`
  background-color: ${({ theme, $bgColor }) => $bgColor ?? theme.bg4};
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 600;
`

const GreenDot = styled.div`
  height: 12px;
  width: 12px;
  margin-right: 12px;
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  position: absolute;
  border: 2px solid black;
  right: -16px;
  bottom: -4px;
`



const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize ?? '16px'};

  :hover {
    text-decoration: none;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`



export default function NetworkDropdown() {
  const [activeNetwork,] = useNetworksData()
  const [showMenu, setShowMenu] = useState(false)

  const node = useRef(null)
  useOnClickOutside(node, () => setShowMenu(false))

  return (
    <Container ref={node}>
      <Wrapper onClick={() => setShowMenu(!showMenu)}>
        <RowFixed>
          <LogoWrapper src={activeNetwork.imageURL} />
          <Text fontSize="14px" color={'white'} ml="8px" mt="-2px" mr="2px" style={{ whiteSpace: 'nowrap' }}>
            {activeNetwork.name}
          </Text>
          {[/*add L1 network*/].includes(
            activeNetwork,
          ) ? null : (
            <Badge $bgColor={activeNetwork.primaryColor} style={{ margin: '0 4px' }}>
              L2
            </Badge>
          )}
          <ChevronDown size="20px" />
        </RowFixed>
      </Wrapper>
      {showMenu && (
        <FlyOut>
          <AutoColumn $gap="16px">
            <Text color={'white'} fontWeight={600} fontSize="16px">
              Select network
            </Text>
            {NETWORKS_LIST.map((n) => {
              return (
                <StyledInternalLink key={n.id} to={`${n === ZeroNetworkNetworkInfo ? '' : '/' + n.route}/home`}>
                  <NetworkRow
                    onClick={() => {
                      setShowMenu(false)
                    }}
                    active={activeNetwork.id === n.id}
                  >
                    <RowFixed>
                      <LogaContainer>
                        <LogoWrapper src={n.imageURL} />
                        {activeNetwork.id === n.id && <GreenDot />}
                      </LogaContainer>
                      <Text ml="12px" color={'white'}>
                        {n.name}
                      </Text>
                    </RowFixed>
                  </NetworkRow>
                </StyledInternalLink>
              )
            })}
          </AutoColumn>
        </FlyOut>
      )}
    </Container>
  )
}
