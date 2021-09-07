import { Table } from 'semantic-ui-react'
import styled from 'styled-components'

export const Level2Wrapper = styled.div`
  background-color: #383838;
  padding: 50px 0;
`

export const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const BIDText = styled('p')<{ color?: string | undefined }>`
  color: ${props => (props.color ? props.color : '#07d807')};
  margin-bottom: 0;
`

export const ASKText = styled('p')<{ color?: string | undefined }>`
  color: ${props => (props.color ? props.color : '#ff0000')};
  margin-bottom: 0;
`

export const TableHeader = styled(Table.HeaderCell)`
  width: 155px;
  display: flex;
  justify-content: space-between;
`

export const AskTableCell = styled(Table.Cell)`
  display: flex;
  justify-content: space-between;
  background: ${props =>
    `-webkit-linear-gradient(to right, #ff000052 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-moz-linear-gradient(to right, #ff000052 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-ms-linear-gradient(to right, #ff000052 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-o-linear-gradient(to right, #ff000052 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `linear-gradient(to right, #ff000052 ${props.percent}%, #38383800 ${props.percent}%)`};
`

export const BidTableCell = styled(Table.Cell)`
  display: flex;
  justify-content: space-between;
  background: ${props =>
    `-webkit-linear-gradient(to left, #00800066 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-moz-linear-gradient(to left, #00800066 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-ms-linear-gradient(to left, #00800066 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `-o-linear-gradient(to left, #00800066 ${props.percent}%, #38383800 ${props.percent}%)`};
  background: ${props =>
    `linear-gradient(to left, #00800066 ${props.percent}%, #38383800 ${props.percent}%)`};
`

export const TextP = styled.p`
  margin-bottom: 0;
`
