import { PlusIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import React, { Fragment } from "react"

const PropsEditor = ({
  removeProp,
  propsArray,
  handlePropChange,
  addNewProp,
}) => {
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 1 }}
        className="ml-4 flex "
      >
        <div className="flex w-full items-center">
          {propsArray.map((propValue, index) => (
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: 170, height: 40 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <motion.input
                key={index}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                onHover={{ scale: 1.1 }}
                type="text"
                value={propValue}
                className="flex h-10 w-[150px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 "
                onChange={(e) => handlePropChange(e, index)}
                placeholder="Enter prop (e.g. name: string)"
              />
            </motion.div>
          ))}
        </div>
        <button
          className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-md border border-dashed border-input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={addNewProp}
        >
          <PlusIcon />
        </button>
        {propsArray.length > 1 && (
          <button
            className="-mt-2 ml-2 inline-flex h-[40px] w-[40px] -translate-y-1 items-center justify-center rounded-md border border-dashed border-input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={removeProp}
          >
            -
          </button>
        )}{" "}
      </motion.div>
    </Fragment>
  )
}

export default PropsEditor
