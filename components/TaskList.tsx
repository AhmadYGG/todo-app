'use client'
import { Task } from '../app/page'

export default function TaskList({ tasks, onToggle, onRemove }: { tasks: Task[], onToggle: (id:string)=>void, onRemove: (id:string)=>void }){
  if (!tasks.length) return <div className="text-gray-400 p-6 bg-gray-800 rounded">No tasks yet — add your first task.</div>

  return (
    <div className="space-y-3">
      {tasks.map(t => (
        <div key={t.id} className="bg-gray-800 p-3 rounded flex items-start gap-3 shadow">
          <input type="checkbox" checked={t.done} onChange={()=>onToggle(t.id)} className="mt-1"/>
          <div className="flex-1">
            <div className={`text-sm ${t.done ? 'line-through text-gray-400' : 'text-gray-100'}`}>{t.text}</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
              <div>{new Date(t.createdAt).toLocaleString()}</div>
              {t.tag && <div className="px-2 py-0.5 bg-gray-700 rounded">{t.tag}</div>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={()=>onRemove(t.id)} className="text-xs text-red-400 hover:underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
