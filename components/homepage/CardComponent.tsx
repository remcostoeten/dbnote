interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div className="icon-card border flex h-[180px] flex-col justify-between rounded-md p-6">
      <div className="icon-card__inner space-y-2">
        <h3 className="font-bold">{icon}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ToolCard
