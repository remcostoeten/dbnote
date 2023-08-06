import React, { useRef } from "react"
import gsap from "gsap"

import styles from "@/styles/modules/Text3d.module.scss"

export default function Index({ primary, secondary }) {
  const text1 = useRef(null)
  const text2 = useRef(null)

  return (
    <div className={styles.textContainer}>
      <p className={styles.primary} ref={text1}>
        {primary}
      </p>
      <p className={styles.secondary} ref={text2}>
        {secondary}
      </p>
    </div>
  )
}
