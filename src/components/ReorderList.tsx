import { useState } from 'react'

export default function ReorderList({ items, answer, onDone }:{
  items: string[]
  answer: string[]
  onDone?: (score:number)=>void
}){
  const [arr,setArr] = useState(items)

  function onDragStart(e:React.DragEvent,idx:number){ e.dataTransfer.setData('text/plain', String(idx)) }
  function onDrop(e:React.DragEvent, idx:number){
    const from = Number(e.dataTransfer.getData('text/plain'))
    if(Number.isNaN(from)) return
    const copy = [...arr]
    const [moved] = copy.splice(from,1)
    copy.splice(idx,0,moved)
    setArr(copy)
  }
  function score(){
    const correct = arr.filter((v,i)=> answer[i]===v).length
    const s = correct/answer.length
    onDone?.(s)
  }

  return (
    <div className="grid">
      {arr.map((v,i)=>(
        <div key={v} className="card row" draggable onDragStart={(e)=>onDragStart(e,i)} onDragOver={e=>e.preventDefault()} onDrop={(e)=>onDrop(e,i)}>
          <span className="tag">{i+1}</span>
          <strong>{v}</strong>
        </div>
      ))}
      <button className="btn" onClick={score}>Comprobar</button>
    </div>
  )
}

