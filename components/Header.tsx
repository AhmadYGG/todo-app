'use client'
export default function Header(){
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold text-black">NR</div>
        <div>
          <div className="text-lg font-semibold">Noverra Community</div>
          <div className="text-xs text-gray-400">Dev Tools</div>
        </div>
      </div>
      <div className="text-sm text-gray-400">Public • Server</div>
    </header>
  )
}
