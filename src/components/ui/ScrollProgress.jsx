import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/5">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
          boxShadow: '0 0 10px #7c3aed, 0 0 20px #06b6d4',
        }}
      />
    </div>
  )
}
