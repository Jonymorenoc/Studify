import { useState } from 'react'

export default function TrueFalse({
  id,
  items,
  keyMap,
  onDone,
}:{
  id:string
  items:{ id:string; text:string }[]
  keyMap:Record<string, boolean>
  onDone?:(score:number)=>void
}){
  const [ans, setAns] = useState<Record<string, boolean>>({})
  const [done, setDone] = useState(false)
  const score = Object.keys(keyMap).length ? Object.keys(keyMap).filter(k => ans[k]===keyMap[k]).length / items.length : 0

  return (
    <div className="grid">
      {items.map(it => (
        <div key={it.id} className="card row" style={{justifyContent:'space-between'}}>
          <span>{it.text}</span>
          <span className="row">
            <label className="chip"><input type="radio" name={`${id}-${it.id}`} onChange={()=>setAns({...ans,[it.id]:true})}/> Verdadero</label>
            <label className="chip"><input type="radio" name={`${id}-${it.id}`} onChange={()=>setAns({...ans,[it.id]:false})}/> Falso</label>
          </span>
        </div>
      ))}
      <div className="row">
        <button className="btn" onClick={()=>{ setDone(true); onDone?.(score) }}>Enviar</button>
        {done && <span>Resultado: {(score*100).toFixed(0)}%</span>}
      </div>
    </div>
  )
}
