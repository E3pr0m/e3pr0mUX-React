import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { cursorRef, followerRef } = useCursor()

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{ backgroundColor: '#a855f7', mixBlendMode: 'difference' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border"
        style={{ borderColor: '#7c3aed', backgroundColor: 'transparent' }}
      />
    </>
  )
}
