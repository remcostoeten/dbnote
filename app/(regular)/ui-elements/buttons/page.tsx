import CustomButtons from "../../../components/buttons/CustomButtons"

export default function page() {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        All the buttons in this project
      </h2>
      <p className="text-muted-foreground">
        and some i would like to add in the future. I'm not a designer, so bla
        bla bla bla
      </p>
      <div className="my-6 h-[1px] w-full shrink-0 bg-border"></div>
      <div className="button-showcase flex flex-col">
        <CustomButtons />
      </div>
    </>
  )
}
