import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { CheckCircle2, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timers.current[id])
    delete timers.current[id]
  }, [])

  const showToast = useCallback((message) => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message }])
    timers.current[id] = setTimeout(() => dismissToast(id), 3200)
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 inset-x-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast-in pointer-events-auto flex items-center gap-2.5 rounded-xl bg-slate-900 text-white ps-4 pe-2.5 py-3 shadow-lg shadow-slate-900/20 max-w-sm w-full"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
