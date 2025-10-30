import { useRef, useState } from 'react'

export default function PinsImage({
  src,
  alt,
  min=3,
}:{src:string; alt:string; min?:number}){
  const ref = useRef<HTMLDivElement>(null)
  const [pins, setPins] = useState<{x:number;y:number;note:string}[]>([])
  function addPin(e:React.MouseEvent){
    const r = ref.current!.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    const note = prompt('¿Qué ves aquí?') || ''
    setPins(p=>[...p,{x,y,note}])
  }
  return (
    <div ref={ref} className="card" style={{position:'relative'}}>
      <img src={src} alt={alt} style={{width:'100%',borderRadius:12}} onClick={addPin} />
      {pins.map((p,i)=> (
        <div key={i} title={p.note} style={{position:'absolute', left:`${p.x}%`, top:`${p.y}%`, transform:'translate(-50%, -100%)'}}>
          <span className="tag" style={{background:'#ffe6ef', borderColor:'#ffa3c0'}}>● {i+1}</span>
        </div>
      ))}
      <p className="subtitle">Añade al menos {min} pines con notas. Toca la imagen para agregar.</p>
    </div>
  )
}

