import { useRef, useState } from 'react'

export default function AudioRecorder(){
  const mediaRef = useRef<MediaRecorder|null>(null)
  const [chunks, setChunks] = useState<Blob[]>([])
  const [url, setUrl] = useState<string>()
  const [rec, setRec] = useState(false)

  async function start(){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mr = new MediaRecorder(stream)
    mediaRef.current = mr
    setChunks([])
    mr.ondataavailable = (e)=> setChunks(arr=>[...arr, e.data])
    mr.onstop = ()=> {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      setUrl(URL.createObjectURL(blob))
    }
    mr.start(); setRec(true)
  }
  function stop(){ mediaRef.current?.stop(); setRec(false) }

  return (
    <div className="card">
      <div className="row">
        {!rec && <button className="btn" onClick={start}>⏺ Grabar</button>}
        {rec && <button className="btn pink" onClick={stop}>⏹ Detener</button>}
        {url && <a className="btn secondary" href={url} download="grabacion.webm">Descargar</a>}
      </div>
      {url && <audio controls src={url} style={{width:'100%'}}/>}
    </div>
  )
}
