import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";

const PropsEditor = ({
  removeProp,
  propsArray,
  handlePropChange,
  addNewProp,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

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
              key={index}
              initial={{ width: 0, height: 0 }}
              animate={{ width: 220, height: 40 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <motion.div className="flex flex-col gap-1">
                {focusedInput === index ? (
                  <>
                    <Input
                      type="text"
                      value={propValue.name}
                      className="..."
                      onChange={(e) => handlePropChange(e, index, "name")}
                      placeholder="Enter prop name (e.g. name)"
                    />
                    <Input
                      type="text"
                      value={propValue.type}
                      className="..."
                      onChange={(e) => handlePropChange(e, index, "type")}
                      placeholder="Enter prop type (e.g. string)"
                    />
                  </>
                ) : (
                  <Input
                    type="text"
                    value={propValue.name}
                    className="..."
                    onFocus={() => setFocusedInput(index)}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => handlePropChange(e, index, "name")}
                    placeholder="Enter prop name (e.g. name)"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-md border border-dashed border-Input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={addNewProp}
        >
          <PlusIcon />
        </motion.button>
        {propsArray.length > 1 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="-mt-2 ml-2 inline-flex h-[40px] w-[40px] -translate-y-1 items-center justify-center rounded-md border border-dashed border-Input bg-transparent px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={removeProp}
          >
            -
          </motion.button>
        )}
      </motion.div>
    </Fragment>
  );
};

export default PropsEditor;
