import { get } from 'lodash'
import * as Excel from 'exceljs/dist/exceljs.min'
import Cookies from 'js-cookie'
import 'whatwg-fetch'
import URL from 'url'
import FileSaver from 'file-saver'

export const parseJSON = function parseJSON(response) {
  return response.json()
}

export const apiFetch = async ({
  url, query, method, body,
}) => {
  const headers = { 'Content-Type': 'application/json' }
  if (Cookies.get('queue-token')) headers.sAMAccountName = Cookies.get('queue-token')
  const res = await fetch(`${process.env.REACT_APP_ENDPOINT}${url}${URL.format({ query })}`, {
    method: method || 'GET',
    headers,
    body: JSON.stringify(body),
  })
  const json = await res.json()
  return json
}

export const getTheme = (propName, done) =>
  props => (done ? done(props.theme[propName[0]]) : props.theme[propName[0]])

export const exportAsExcel = ({
  columns, data, filename, sheetName,header
}) => new Promise((resolve) => {
  const workbook = new Excel.Workbook()
  workbook.created = new Date()
  const sheet = workbook.addWorksheet(sheetName)
  sheet.addRow([header])
  sheet.addRow([" "])
  const _columns = columns.reduce((columnList, col) => {
    if (!col.children) return columnList.concat([col])
    return columnList.concat(col.children.map(child => ({ ...child, title: `${col.title} - ${child.title}` })))
  }, [])
  sheet.addRow( _columns.map(({ title, key, width }) =>title))
  sheet.columns = _columns.map(({ title, key, width }) => ({
    // header: title,
    key,
    width: ((width || 0) / 4) || 30,
  }))
  const row = sheet.getRow(3)
  row.font = {
    size: 16,
    bold: true,
  }
  row.alignment = { vertical: 'middle', horizontal: 'center' }
  row.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF7F7F7' },
  }
  console.log('>>'+data);
  data.forEach((datum) => {
    const newRow = sheet.addRow(_columns.map(({ render }) => {
      console.log('render',render)
      const value = render(datum)
      return typeof value === 'object' ? get(value, 'props.children') : value
    }))
    newRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: isNaN(cell) ? 'left' : 'center' }
    })
  })
  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), filename) // eslint-disable-line
      resolve()
    })
})

export const exportArrayAsExcel = ({
  columns, data, filename,
}) => new Promise((resolve) => {
  const workbook = new Excel.Workbook()
  workbook.created = new Date()
  data.map((currentData, index) => {
    const sheet = workbook.addWorksheet(`car-${index + 1}`)
    const _columns = columns.reduce((columnList, col) => {
      if (!col.children) return columnList.concat([col])
      return columnList.concat(col.children.map(child => ({ ...child, title: `${col.title} - ${child.title}` })))
    }, [])
    sheet.columns = _columns.map(({ title, key, width }) => ({
      header: title,
      key,
      width: ((width || 0) / 4) || 20,
    }))
    const row = sheet.getRow(1)
    row.font = {
      size: 16,
      bold: true,
    }
    row.alignment = { vertical: 'middle', horizontal: 'center' }
    row.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF7F7F7' },
    }
    // console.log('>>'+filename);
    currentData.forEach((datum) => {
      const newRow = sheet.addRow(_columns.map(({ render }) => {
        const value = render(datum)
        return typeof value === 'object' ? get(value, 'props.children') : value
      }))
      newRow.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' }
      })
    })
  })

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), filename) // eslint-disable-line
      resolve()
    })
})
