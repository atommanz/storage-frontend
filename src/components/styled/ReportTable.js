import { Table } from 'antd'
import styled from 'styled-components'

export default styled(Table)`
.ant-table-placeholder{
  min-height: 200px;
}
td>div.occupied {
  background-color: grey !important;
  cursor: not-allowed;
}
td>div.clicked {
  background-color: #13c2c2 !important;
}
td>div {
  margin: -16px;
  height: 62px;
}
th[colspan] {
  text-align: left !important;
}
td:not(:first-child):hover {
  cursor: pointer;
  background-color: #13c2c2 !important;
}
`

