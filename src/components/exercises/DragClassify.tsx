import { useMemo, useState } from 'react'
import { saveProgress } from '../../state/progress'

type Item = { id:string; text:string; group:string }

export default function DragClassify({ id, groups, items }:{
  id:string
  groups: string[]
  items: Item[]
}){
  const [bins, setBins] = useState<Record<string, Item[]>>(()=>Object.fromEntries(groups.map(g=>[g,[]])))
  const [pool, setPool] = useState<Item[]>(items)
  const [done, setDone] = useState(false)

  const allowDrop = (e: React.DragEvent)=> e.preventDefault()
  function onDrop(group:string, e: React.DragEvent){
    const id = e.dataTransfer.getData('text')
    const it = pool.find(p=>p.id===id) || Object.values(bins).flat().find(p=>p.id===id)
    if(!it) return
    setBins(prev=>{
      const next = structuredClone(prev) as typeof prev
      // remove from other groups
      for(const g of Object.keys(next)){
        next[g] = next[g].filter(p=>p.id!==id)
      }
      if(group !== 'pool'){
        next[group] = [...(next[group] || []), it]
      }
      return next
    })
    setPool(prev=>{
      // moving to pool returns the card to the bank; otherwise remove from bank
      const without = prev.filter(p=>p.id!==id)
      return group === 'pool' ? [...without, it] : without
    })
  }

  const score = useMemo(()=>{
    const total = items.length
    const correct = Object.entries(bins).reduce((acc,[g,arr])=>acc + arr.filter(a=>a.group===g).length,0)
    return total? correct/total : 0
  },[bins, items])

  function finish(){
    setDone(true)
    saveProgress(id,{score, stars: score>0.8?3:score>0.5?2:1, attempts:1, completedAt:Date.now()})
  }

  return (
    <div className="grid cols-2">
      <div className="card" aria-label="banco de tarjetas" onDragOver={allowDrop} onDrop={e=>onDrop('pool',e)}>
        <h4 className="title">Tarjetas</h4>
        <div className="grid" style={{gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:8}}>
          {pool.map(it=> (
            <div
              key={it.id}
              draggable
              role="button"
              tabIndex={0}
              aria-label={`Tarjeta ${it.text}`}
              onKeyDown={e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); /* no-op for keyboard drag */ } }}
              onDragStart={e=>e.dataTransfer.setData('text', it.id)}
              style={{padding:8, borderRadius:12, border:'1px dashed #334155', textAlign:'center'}}>
              {it.text}
            </div>
          ))}
        </div>
      </div>
      <div className="grid" style={{gap:12}}>
        {groups.map(g => (
          <div key={g} className="card" role="region" aria-label={`Destino ${g}`} onDragOver={allowDrop} onDrop={e=>onDrop(g,e)}>
            <h4 className="title">{g}</h4>
            <div className="row" style={{flexWrap:'wrap', gap:8}}>
              {bins[g].map(it=> (
                <span
                  key={it.id}
                  role="button"
                  tabIndex={0}
                  draggable
                  onKeyDown={e=>{ if(e.key==='Backspace' || e.key==='Delete'){ onDrop('pool', { ...e, dataTransfer: { getData:()=>it.id } } as unknown as React.DragEvent) }}}
                  onDragStart={e=>e.dataTransfer.setData('text', it.id)}
                  className="tag"
                >{it.text}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="row">
          <button className="btn" onClick={finish} disabled={done}>Comprobar</button>
          {done && <span>Resultado: {(score*100).toFixed(0)}%</span>}
        </div>
      </div>
    </div>
  )
}
