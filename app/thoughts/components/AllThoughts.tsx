import { NewThought } from "./NewThought"
import ThoughtCard from "./ThoughtCard"

export default function AllThoughts() {
  return (
    <>
      <div className="flex-col px-4 py-6  ">
        <div className="flex w-full ">
          <NewThought />ddd
        </div>
        <div className="seperator-notes"></div>
        <div className="flex flex-col gap-4 py-4">dddddddd
          <ThoughtCard />
        </div>
      </div>
    </>
  )
}          
