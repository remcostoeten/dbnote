"use client"

import { motion } from "framer-motion"

function LogoIconOnly() {
  const pathVariants = {
    initial: { opacity: 0, pathLength: 0 },
    animate: { opacity: 1, pathLength: 1, transition: { duration: 2 } },
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46.8"
      height="46"
      x="0"
      y="0"
      className="icon-svg"
      enableBackground="new 0 0 209.8 46"
      xmlSpace="preserve"
      fill="white"
    >
      <motion.path
        d="M23.885 19.583a13.83 13.83 0 001.604-3.552c1.474 3.161 4.679 5.36 8.39 5.36v3.219h-.029c-5.098 0-9.25 4.156-9.25 9.265h-3.214c-.01-4.669 2.557-8.743 6.355-10.884a12.485 12.485 0 01-3.856-3.408z"
        fill="white"
        className="st0 svg-elem-1 logo__icon-right"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M20.499 29.92c-1.426-3.025-4.432-5.156-7.95-5.316-.14.005-.28.005-.426.005V21.37c.14 0 .286.005.426.005a9.175 9.175 0 006.118-2.697 9.204 9.204 0 002.707-6.554h3.219c0 3.335-1.296 6.467-3.654 8.825a12.464 12.464 0 01-2.673 2.045 12.559 12.559 0 013.842 3.392A13.93 13.93 0 0020.5 29.92z"
        fill="white"
        className="st0 svg-elem-2 logo__icon-left"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  )
}

export default LogoIconOnly
