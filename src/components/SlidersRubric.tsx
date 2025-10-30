import { useMemo, useState } from 'react'

export default function SlidersRubric({ onDone }:{onDone?:(score:number, tips:string[])=>void}){
  const [p,setP]=useState(3)
  const [v,setV]=useState(3)
  const [m,setM]=useState(3)
  const tips = useMemo(()=>[
    advise(p,'Pronunciación'), advise(v,'Volumen'), advise(m,'Modulación')
  ],[p,v,m])
  const score = (p+v+m)/15
  return (
    <div className="grid">
      <Slider label="Pronunciación" value={p} onChange={setP}/>
      <Slider label="Volumen" value={v} onChange={setV}/>
      <Slider label="Modulación" value={m} onChange={setM}/>
      <div className="card">
        <ul>
          {tips.map((t,i)=>(<li key={i}>{t}</li>))}
        </ul>
      </div>
      <button className="btn" onClick={()=>onDone?.(score,tips)}>Guardar autoevaluación</button>
    </div>
  )
}

function Slider({label, value, onChange}:{label:string; value:number; onChange:(v:number)=>void}){
  return (
    <label className="card row" style={{justifyContent:'space-between'}}>
      <strong>{label}</strong>
      <input type="range" min={1} max={5} value={value} onChange={(e)=>onChange(Number(e.target.value))} />
      <span className="tag">{value}</span>
    </label>
  )
}

function advise(v:number, area:string){
  if(v<=2) return `${area}: Practica pausas y respiración.`
  if(v===3) return `${area}: Varía entonación y ritmo.`
  return `${area}: ¡Buen control! Mantén el equilibrio.`
}

