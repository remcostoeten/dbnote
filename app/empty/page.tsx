interface RootLayoutProps {
  children?: React.ReactNode
}

const ComponentName = (props: RootLayoutProps): React.ReactElement => {
  return (
    <div>
      <div
        role="region"
        aria-label="Notifications (F8)"
        tabindex="-1"
        style={{ pointerEvents: "none" }}
      >
        <ol
          tabindex="-1"
          className="absolute right-[15%] z-[100] scale-150 flex max-h-screen flex-col-reverse p-4 bottom-[50px] sm:flex-col md:max-w-[420px]"
        ></ol>
      </div>
    </div>
  )
}

export default ComponentName
