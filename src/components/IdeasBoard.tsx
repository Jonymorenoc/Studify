import { useState } from 'react'

export default function IdeasBoard(){
  const ideas = ['Podcast escolar','Mural comunitario','Lectura nocturna','Archivo digital','Festival de leyendas']
  const [mine,setMine]=useState<string[]>([])
  function onDrop(e:React.DragEvent){
    const txt = e.dataTransfer.getData('text/plain')
    if(txt) setMine(m=> m.includes(txt)? m : [...m, txt])
  }
  return (
    <div className="grid cols-2">
      <div className="card">
        <h4 className="title">Ideas disponibles</h4>
        <div className="row" style={{flexWrap:'wrap'}}>
          {ideas.map(i=> (
            <span key={i} className="chip" draggable onDragStart={(e)=>e.dataTransfer.setData('text/plain', i)}>{i}</span>
          ))}
        </div>
      </div>
      <div className="card" onDragOver={e=>e.preventDefault()} onDrop={onDrop}>
        <h4 className="title">Mis ideas</h4>
        <div className="row" style={{flexWrap:'wrap'}}>
          {mine.map(i=> (<span key={i} className="chip active">{i}</span>))}
        </div>
      </div>
    </div>
  )
}

