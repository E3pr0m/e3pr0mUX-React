import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let isHovering = false

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX - 6, y: mouseY - 6, duration: 0.1 })
      gsap.to(follower, { x: mouseX - 20, y: mouseY - 20, duration: 0.35 })
    }

    const onEnter = () => {
      if (isHovering) return
      isHovering = true
      gsap.to(cursor, { scale: 2.5, backgroundColor: '#06b6d4', duration: 0.3 })
      gsap.to(follower, { scale: 1.5, borderColor: '#06b6d4', duration: 0.3 })
    }

    const onLeave = () => {
      isHovering = false
      gsap.to(cursor, { scale: 1, backgroundColor: '#a855f7', duration: 0.3 })
      gsap.to(follower, { scale: 1, borderColor: '#7c3aed', duration: 0.3 })
    }

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)

    // Observe new elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return { cursorRef, followerRef }
}
