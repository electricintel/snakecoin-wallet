export const HOST_URL = 'http://localhost:5000'

// path, query, fragment
export const uri=(p,q,f)=>{
  const uri = [HOST_URL]
  if (typeof(p)==='string'&&p.length>0) {
     uri.push(`/${p}`)
  }
  if (typeof(q)==='string'&&q.length>0) {
    uri.push(`?${q}`)
  }
  if (typeof(f)==='string'&&f.length>0) {
    uri.push(`#${f}`)
  }
  return uri.join('')
}

export const login=(value,cb,cbe)=>{
  if (typeof(value)==='object'&&value!==null) {
    const url = uri('login')
    fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(value)
    }).catch(e=>{
      if (typeof(cbe)==='function') cbe(e)
    }).then(response=>{
      return response.json()
    }).catch(e=>{
      if (typeof(cbe)==='function') cbe(e)
    }).then(data=>{
      if (typeof(cb)==='function') cb(data)
    })
  }
}

export const balance=(username,cb,cbe)=>{
  if (typeof(username)==='string'&&username.length>0) {
    const url = uri('balance',username)
    fetch(url).then(response=>{
      return response.json()
    }).catch(e=>{
      if (typeof(cbe)==='function') cbe(e)
    }).then(data=>{
      if (typeof(cb)==='function') cb(data)
    })
  }
}

export const history=(username,cb,cbe)=>{
  if (typeof(username)==='string'&&username.length>0) {
    const url = uri('history',username)
    fetch(url).then(response=>{
      return response.json()
    }).catch(e=>{
      if (typeof(cbe)==='function') cbe(e)
    }).then(data=>{
      if (typeof(cb)==='function') cb(data)
    })
  }
}
