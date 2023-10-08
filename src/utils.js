const baseURL = 'https://data-visualisation-wkb6.onrender.com';

export function getOverviewData(){
    return fetch(`${baseURL}/overview/`)
    .then(response => response.json())
}

export function getFilteredData(filter, value){
    return fetch(`${baseURL}/overview/filter`, {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ filter, value })     
    })
    .then(response => response.json())
}

export function getFilterValues(value){
  return fetch(`${baseURL}/${value}`)
  .then(response => response.json())
}