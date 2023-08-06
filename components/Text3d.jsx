import React, { useRef } from "react"

export default function Index({ primary, secondary }) {
  const text1 = useRef(null)
  const text2 = useRef(null)

  return (
    <div className="perspective-text__container">
      <p className="perspective-text__primary" ref={text1}>
        {primary}
      </p>
      <p className="perspective-text__secondary" ref={text2}>
        {secondary}
      </p>
    </div>
  )
}
