import Cookies from 'js-cookie'
import en from './i18n/en.js'
import zh from './i18n/zh.js'

function resolveLanguage(msg) {
  let language = Cookies.get('language') || (navigator.language || navigator.browserLanguage).toLowerCase()
  if (language.indexOf('en') > -1) {
    language = en
  } else if (language.indexOf('zh') > -1) {
    language = zh
  }
  return resolveMsg(language, msg)
}

function resolveMsg(language, fields) {
  let result = language
  const fieldArr = fields.split('.')
  for (let i = 0, iLength = fieldArr.length; i < iLength; i++) {
    result = result[fieldArr[i]]
    if (typeof result === 'string' && i === iLength - 1) {
      return result
    }
  }
}

export function success(data) {
  return {
    code: 'SUCCESS',
    data: data
  }
}

export function successMsg(msg) {
  return {
    code: 'SUCCESS',
    message: resolveLanguage(msg)
  }
}

export function fail(error) {
  return {
    code: 5008,
    message: resolveLanguage(error)
  }
}

export function failCodeMsg(code, error) {
  return {
    code: code,
    message: resolveLanguage(error)
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
