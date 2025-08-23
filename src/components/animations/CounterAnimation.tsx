'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface CounterAnimationProps {
  from?: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  formatter?: (value: number) => string
  triggerStart?: string
}

export function CounterAnimation({
  from = 0,
  to,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  formatter,
  triggerStart = 'top 80%',
}: CounterAnimationProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(from)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady) return

    const counter = counterRef.current
    if (!counter) return

    if (prefersReducedMotion) {
      setDisplayValue(to)
      return
    }

    const obj = { value: from }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: counter,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      }
    })

    tl.to(obj, {
      value: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value))
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === counter) {
          trigger.kill()
        }
      })
    }
  }, [isReady, prefersReducedMotion, from, to, duration, triggerStart])

  const formattedValue = formatter ? formatter(displayValue) : displayValue.toString()

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  )
}