interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div data-type="cursor" className="cursor-hover icon-card border flex h-[250px] flex-col justify-between rounded-md p-6">
      <div className="icon-card__inner space-y-1">

        <span className="font-bold items-start" >{icon}</span>
        <h3 className="font-bold items-start">{title}</h3>

        <p className="cursor-hover  text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ToolCard
