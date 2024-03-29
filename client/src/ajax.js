
class Ajax {
  ajax = (_url, { method = 'GET', params, data }) => {
    const options = {
      method, headers: { 'Content-Type': 'application/json' }
    }
    let url = `${_url}`;
    if (params) {
      url = `${url}?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`
    }

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data)
    }
    return fetch(url, options).then((res) => res.json())
  }

  post = (url, data) => this.ajax(url, { method: "POST", data })

  get = (url, params) => this.ajax(url, { method: "GET", params })
}
// eslint-disable-next-line
export default new Ajax()
