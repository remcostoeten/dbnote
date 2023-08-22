import { Badge } from "@/components/ui/badge"

export const emojis = {
  rocket: "🚀",
  fire: "🔥",
}

type StatusBadgeProps = {
  title?: any
  emoji?: any
  index: any
}

export default function CustomStatusBadge({
  title,
  emoji,
  index,
}: StatusBadgeProps) {
  const yOffset = index * 30 // Each badge will be shifted by 30 pixels vertically
  const style = {
    transform: `translateX(-3rem) translateY(${yOffset}px)`,
  }

  return (
    <Badge variant="default" className="absolute right-0" style={style}>
      {title} {emojis[emoji as any]}
    </Badge>
  )
}

// USAGE
// / const badges = [
//   { title: "Beta", emoji: "rocket" },
//   { title: "Hot", emoji: "fire" },
// ]

// return (
//     {badges.map((badge, index) => (
//       <CustomStatusBadge key={index} {...badge} index={index} />
//     ))}
// )
// }
