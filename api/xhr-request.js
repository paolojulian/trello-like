const XHRRequest = {
    any: async requestData => {
      let {url, dataType= "json"} = requestData
        
      const discard = ["url", "dataType"]
      for(let val of discard) {
        delete requestData[val]
      }

      const fetchRequest = await fetch(url, requestData)
      
      const response = {
        data: await eval(`fetchRequest.${dataType}()`),
        status: fetchRequest.ok,
      }

      return response
    },
    get : async requestData => {
      let {url, dataType= "json"} = requestData
        
      const discard = ["url", "dataType"]
      for(let val of discard) {
        delete requestData[val]
      }

      requestData.method = "GET"

      const fetchRequest = await fetch(url, requestData)
      
      const response = {
        data: await eval(`fetchRequest.${dataType}()`),
        status: fetchRequest.ok,
      }

      return response
    },
    post : ({url, data}) => {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(err => console.error(err));

    },
    delete: (url) => {
        return fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => response.json())
        .catch(err => console.error(err));
    },
}
export default XHRRequest;
