'use client'

import { useEffect, useState } from 'react'
import TaskInput from '../components/TaskInput'
import TaskList from '../components/TaskList'

export type Task = {
  id: string
  text: string
  done: boolean
  tag?: string
  createdAt: number
}

const STORAGE_KEY = 'noverra_tasks_v1'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
  const [isLoaded, setIsLoaded] = useState(false)

  // 🧠 Load data dari localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setTasks(parsed)
      }
    } catch (err) {
      console.error('❌ Failed to load tasks:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 💾 Simpan ke localStorage setiap kali tasks berubah
  useEffect(() => {
    if (!isLoaded) return // jangan simpan sebelum load selesai
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('❌ Failed to save tasks:', err)
    }
  }, [tasks, isLoaded])

  // ➕ Tambah task baru
  const addTask = (text: string, tag?: string) => {
    if (!text.trim()) return
    const newTask: Task = {
      id: String(Date.now()) + Math.floor(Math.random() * 1000),
      text: text.trim(),
      done: false,
      tag: tag?.trim() || undefined,
      createdAt: Date.now(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  // ✅ Toggle task done/undone
  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  // ❌ Hapus task
  const remove = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // 🧹 Hapus semua task yang done
  const clearDone = () => {
    setTasks(prev => prev.filter(t => !t.done))
  }

  // 🎯 Filter task (All / Active / Done)
  const filtered = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.done
    return t.done
  })

  // 📊 Progress bar
  const doneCount = tasks.filter(t => t.done).length
  const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Your ToDo</h1>
            <p className="text-sm text-gray-400">
              Simple task board for make your ToDo.
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-400">Progress</div>
            <div className="w-40 bg-gray-700 rounded-full h-3 mt-1 overflow-hidden">
              <div
                style={{ width: `${percent}%` }}
                className="h-3 bg-green-400 transition-all"
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{percent}% done</div>
          </div>
        </div>

        <div className="mt-4">
          <TaskInput onAdd={addTask} />

          <div className="flex gap-2 mt-3 flex-wrap">
            {(['all', 'active', 'done'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded ${
                  filter === f
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}

            <button
              onClick={clearDone}
              className="ml-auto px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Clear Done
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <TaskList tasks={filtered} onToggle={toggle} onRemove={remove} />
      </div>
    </div>
  )
}
