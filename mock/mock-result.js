export function success(data) {
  return {
    code: 'SUCCESS',
    data: data
  }
}

export function successMsg(msg) {
  return {
    code: 'SUCCESS',
    message: msg
  }
}

export function fail(error) {
  return {
    code: 5008,
    message: error
  }
}

export function failCodeMsg(code, error) {
  return {
    code: code,
    message: error
  }
}

export function buildPage(params, list) {
  if (!params || !params.currentPage) {
    return {
      list: list,
      total: list.length
    }
  }
  // 参数
  const pageNum = params.currentPage
  const pageSize = params.pageLimit
  const sort = params.sort
  // 处理
  const indexStart = (pageNum - 1) * pageSize
  const indexEnd = indexStart + pageSize
  let flag = 0
  let filter = []
  list.filter(item => {
    for (const k in params) {
      if (k !== 'currentPage' && k !== 'pageLimit' && k !== 'sort') {
        if (params[k]) {
          if (item[k] && item[k].indexOf(params[k]) > -1 && !filter.includes(item)) {
            filter.push(item)
          }
          flag++
        }
      }
    }
  })
  if (flag === 0) {
    filter = list
  }
  if (sort) {
    filter.sort((a, b) => {
      if (sort.toString().startsWith('+')) {
        const field = sort.substr(1)
        return a[field] - b[field]
      } else if (sort.toString().startsWith('-')) {
        const field = sort.substr(1)
        return b[field] - a[field]
      } else {
        return a[sort] - b[sort]
      }
    })
  }
  console.log(filter)
  return {
    list: filter.slice(indexStart, indexEnd),
    total: filter.length
  }
}
