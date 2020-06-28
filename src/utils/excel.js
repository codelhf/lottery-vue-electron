import XLSX from 'xlsx'

export function readExcel(file, header, callback) {
  const reader = new FileReader()
  reader.onload = function(e) {
    const workbook = XLSX.read(e.target.result, { type: 'binary' })
    const sheet0 = workbook.Sheets[workbook.SheetNames[0]] // sheet0代表excel表格中的第一页
    const json = XLSX.utils.sheet_to_json(sheet0) // 利用接口实现转换
    // 转换表头
    const tempData = []
    for (const i in json) {
      const item = json[i]
      const item1 = {}
      for (const hi in header) {
        const hItem = header[hi]
        const key = hItem.field
        for (const k in item) {
          if (hItem.name === k) {
            let val = item[k]
            if (hItem.type === 'number') {
              val = parseInt(val)
            }
            item1[key] = val
          }
        }
      }
      tempData.push(item1)
    }
    if (typeof callback === 'function') {
      callback(tempData)
    }
  }
  reader.readAsBinaryString(file)
}

export function writeExcel({
  data, header, autoWidth = true, filename, bookType = 'xlsx'
}) {
  const temData = []
  if (!data) {
    const item = {}
    for (const hi in header) {
      const hItem = header[hi]
      const key = hItem.name
      item[key] = ''
    }
    temData.push(item)
  } else {
    for (const i in data) {
      const item = data[i]
      const item1 = {}
      for (const hi in header) {
        const hItem = header[hi]
        const key = hItem.name
        for (const k in item) {
          if (hItem.field === k) {
            item1[key] = item[k]
          }
        }
      }
      temData.push(item1)
    }
  }

  const worksheet = XLSX.utils.json_to_sheet(temData)

  if (autoWidth) {
    // 设置worksheet每列的最大宽度
    const colWidth = []
    for (const i in temData) {
      const row = temData[i]
      const rowWidth = []
      for (const k in row) {
        const val = row[k]
        let cellWidth = null
        if (!val) { // 先判断是否为null/undefined
          cellWidth = { 'wch': 10 }
        } else if (val.toString().charCodeAt(0) > 255) { // 再判断是否为中文
          cellWidth = { 'wch': val.toString().length * 2 }
        } else {
          cellWidth = { 'wch': val.toString().length }
        }
        rowWidth.push(cellWidth)
      }
      colWidth.push(rowWidth)
    }
    // 以第一行为初始值
    const row0With = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (!row0With[j]) {
          row0With.push(colWidth[i][j])
        }
        if (row0With[j]['wch'] < colWidth[i][j]['wch']) {
          row0With[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    worksheet['!cols'] = row0With
  }

  const sheetName = 'Sheet0'
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = worksheet // 生成excel的配置项
  const writingOptions = {
    bookType: bookType, // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }

  const workbookOutput = XLSX.write(workbook, writingOptions)
  saveAs(new Blob([s2ab(workbookOutput)], {
    type: 'application/octet-stream'
  }), `${filename}.${bookType}`)
}

function saveAs(obj, fileName) {
  const a = document.createElement('a')
  a.download = fileName || '下载'
  a.href = URL.createObjectURL(obj)
  a.click()
  setTimeout(function() {
    URL.revokeObjectURL(obj)
  }, 100)
}

// 字符串转ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}
