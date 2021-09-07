import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { Table } from 'semantic-ui-react'

import {
  AskTableCell,
  ASKText,
  BidTableCell,
  BIDText,
  TableHeader,
  TextP,
} from '../atoms/styles'

interface IDataTableProps {
  askStrokeColor?: string
  bidStrokeColor?: string
}

const DataTable: React.FC<IDataTableProps> = (props: IDataTableProps) => {
  const { askStrokeColor, bidStrokeColor } = props
  const [data, setData] = useState([])
  const [maxShare, setMaxShare] = useState(0)
  const getData = () => {
    fetch('data/tableData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json()
      })
      .then(myJson => {
        setData(myJson)
        console.log(myJson)
        const maxBidShares = d3.max(myJson, (d: any) => d.bidShares)!
        const maxAskShares = d3.max(myJson, (d: any) => d.askShares)!

        const maxShare =
          maxBidShares > maxAskShares ? maxBidShares : maxAskShares
        setMaxShare(parseFloat(maxShare))
      })
  }

  const renderData = () => {
    return (
      <Table.Body>
        {data!.map((item: any, index) => (
          <Table.Row textAlign="center" key={`table-row-${index.toString()}`}>
            <BidTableCell
              percent={(item.bidShares / maxShare) * 100}
              bidStrokeColor={bidStrokeColor}
            >
              <TextP>{item.bidShares}</TextP>
              <BIDText color={bidStrokeColor}>{item.bidValue}</BIDText>
            </BidTableCell>
            <Table.Cell>{index + 1}</Table.Cell>
            <AskTableCell
              percent={(item.askShares / maxShare) * 100}
              askStrokeColor={askStrokeColor}
            >
              <ASKText color={askStrokeColor}>{item.askValue}</ASKText>
              <p>{item.askShares}</p>
            </AskTableCell>
          </Table.Row>
        ))}
      </Table.Body>
    )
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Table celled inverted selectable collapsing>
      <Table.Header>
        <Table.Row textAlign="center">
          <TableHeader colSpan="2">
            <TextP>SHARES</TextP>
            <BIDText>BID</BIDText>
          </TableHeader>
          <Table.HeaderCell>10</Table.HeaderCell>
          <TableHeader>
            <ASKText>ASK</ASKText>
            <TextP>SHARES</TextP>
          </TableHeader>
        </Table.Row>
      </Table.Header>
      {renderData()}
    </Table>
  )
}

export default React.memo(DataTable)
