'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface TypewriterTextProps {
  text: string | string[]
  speed?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  className?: string
  cursor?: boolean
  cursorChar?: string
  triggerStart?: string
}

export function TypewriterText({
  text,
  speed = 0.1,
  delay = 0,
  repeat = false,
  repeatDelay = 2,
  className = '',
  cursor = true,
  cursorChar = '|',
  triggerStart = 'top 80%',
}: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady) return

    const textElement = textRef.current
    const cursorElement = cursorRef.current
    if (!textElement) return

    if (prefersReducedMotion) {
      const finalText = Array.isArray(text) ? text[text.length - 1] : text
      textElement.textContent = finalText
      if (cursorElement) cursorElement.style.display = 'none'
      return
    }

    // Cursor blinking animation
    if (cursor && cursorElement) {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textElement,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      }
    })

    if (Array.isArray(text)) {
      // Multiple texts - type each one
      text.forEach((t, index) => {
        tl.to(textElement, {
          text: t,
          duration: t.length * speed,
          ease: 'none',
          delay: index === 0 ? delay : 0,
        })

        if (index < text.length - 1) {
          // Pause between texts
          tl.to(textElement, {
            text: '',
            duration: t.length * speed * 0.3,
            ease: 'none',
            delay: repeatDelay,
          })
        }
      })

      if (repeat) {
        tl.repeat(-1).repeatDelay(repeatDelay)
      }
    } else {
      // Single text
      tl.to(textElement, {
        text,
        duration: text.length * speed,
        ease: 'none',
        delay,
      })

      if (repeat) {
        tl.to(textElement, {
          text: '',
          duration: text.length * speed * 0.3,
          ease: 'none',
          delay: repeatDelay,
        })
        tl.repeat(-1)
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === textElement) {
          trigger.kill()
        }
      })
    }
  }, [isReady, prefersReducedMotion, text, speed, delay, repeat, repeatDelay, cursor, triggerStart])

  return (
    <span className={className}>
      <span ref={textRef}></span>
      {cursor && (
        <span ref={cursorRef} className="cursor">
          {cursorChar}
        </span>
      )}
    </span>
  )
}