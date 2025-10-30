import { useRef } from 'react'
import html2canvas from 'html2canvas'

export default function CharacterBuilder(){
  const ref = useRef<HTMLDivElement>(null)
  function add(s:string){
    const el=document.createElement('span'); el.textContent=s; el.style.fontSize='36px'; el.style.margin='2px'; ref.current?.appendChild(el)
  }
  async function exportPNG(){ if(!ref.current) return; const canvas=await html2canvas(ref.current); const url=canvas.toDataURL('image/png'); const a=document.createElement('a'); a.href=url; a.download='mi-personaje.png'; a.click() }
  return (
    <div className="grid">
      <div ref={ref} className="card" style={{height:220,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
        <div style={{width:90,height:150,borderRadius:40,background:'#f0f6ff'}}></div>
      </div>
      <div className="row">
        {['🧑','👩','🧒','👧','👗','🧥','🎒','👒','👑','😃','😐','😮','🦶','🖐️'].map(s=>(<button className="chip" key={s} onClick={()=>add(s)}>{s}</button>))}
        <button className="btn secondary" onClick={exportPNG}>Exportar PNG</button>
      </div>
    </div>
  )
}

