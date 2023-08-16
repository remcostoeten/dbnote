import { Input } from "@/components/ui/input"

const PropsEditor = ({ propsArray, handlePropChange, addNewProp }) => {
  return (
    <div>
      {propsArray.map((propValue, index) => (
        <div key={index}>
          <Input
            type="text"
            value={propValue}
            onChange={(e) => handlePropChange(e, index)}
            placeholder="Enter prop (e.g. name: string)"
          />
        </div>
      ))}
      <button onClick={addNewProp}>+</button>
    </div>
  )
}

export default PropsEditor
