export const buildUrl = (url, params) => {
    let urlWidthParams = url

    Object.entries(params).forEach(([key, value], i) => {
        const sign = i === 0 ? '?' : '&'
        urlWidthParams+=`${sign}${key}=${value}`
    })

    return urlWidthParams
}