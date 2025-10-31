import { useMemo, useState } from 'react'
import { saveProgress } from '../../state/progress'

type Item = {
  id: string
  text: string
  group: string
}

type Props = {
  id: string
  groups: string[]
  items: Item[]
}

const defaultTargetOnEnter = (groups: string[]) => groups[0] ?? 'pool'

export default function DragClassify({ id, groups, items }: Props) {
  const [placements, setPlacements] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    items.forEach(item => {
      initial[item.id] = 'pool'
    })
    return initial
  })
  const [done, setDone] = useState(false)

  const poolItems = useMemo(() => items.filter(item => placements[item.id] === 'pool'), [items, placements])
  const groupedItems = useMemo(() => {
    return groups.reduce<Record<string, Item[]>>((acc, group) => {
      acc[group] = items.filter(item => placements[item.id] === group)
      return acc
    }, {})
  }, [groups, items, placements])

  const score = useMemo(() => {
    const total = items.length
    const correct = items.filter(item => placements[item.id] === item.group).length
    return total ? correct / total : 0
  }, [items, placements])

  const allowDrop = (event: React.DragEvent) => event.preventDefault()

  const moveItem = (target: string, id: string | null) => {
    if (!id) return
    setPlacements(prev => ({ ...prev, [id]: target }))
  }

  const handleDrop = (target: string, event: React.DragEvent) => {
    event.preventDefault()
    const draggedId = event.dataTransfer.getData('text')
    moveItem(target, draggedId)
  }

  const handleKeyMove = (target: string, id: string) => {
    moveItem(target, id)
  }

  const finish = () => {
    setDone(true)
    const stars = score > 0.8 ? 3 : score > 0.5 ? 2 : 1
    saveProgress(id, { score, stars, attempts: 1, completedAt: Date.now() })
  }

  return (
    <div className="grid cols-2">
      <div
        className="card"
        aria-label="Banco de tarjetas"
        onDragOver={allowDrop}
        onDrop={event => handleDrop('pool', event)}
      >
        <h4 className="title">Tarjetas</h4>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
          {poolItems.map(item => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`Tarjeta ${item.text}`}
              draggable
              onDragStart={event => event.dataTransfer.setData('text', item.id)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleKeyMove(defaultTargetOnEnter(groups), item.id)
                }
              }}
              style={{ padding: 8, borderRadius: 12, border: '1px dashed #334155', textAlign: 'center' }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {groups.map(group => (
          <div
            key={group}
            className="card"
            role="region"
            aria-label={`Destino ${group}`}
            onDragOver={allowDrop}
            onDrop={event => handleDrop(group, event)}
          >
            <h4 className="title">{group}</h4>
            <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
              {groupedItems[group]?.map(item => (
                <span
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  draggable
                  onDragStart={event => event.dataTransfer.setData('text', item.id)}
                  onKeyDown={event => {
                    if (event.key === 'Backspace' || event.key === 'Delete') {
                      event.preventDefault()
                      handleKeyMove('pool', item.id)
                    }
                  }}
                  className="tag"
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="row">
          <button className="btn" onClick={finish} disabled={done}>
            Comprobar
          </button>
          {done && <span>Resultado: {(score * 100).toFixed(0)}%</span>}
        </div>
      </div>
    </div>
  )
}

