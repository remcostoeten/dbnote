import { Badge } from "@/components/ui/badge";

export const emojis = {
  rocket: "🚀",
  fire: "🔥",
  megaphone: "📣",
  moneyBag: "💰",
  graph: "📈",
  trophy: "🏆",
  lightBulb: "💡",
  star: "⭐",
  thumbsUp: "👍",
  handshake: "🤝",
  target: "🎯",
  loudspeaker: "📢",
  telephone: "☎️",
  globe: "🌍",
  email: "✉️",
  mobilePhone: "📱",
  billboard: "🚧",
  calendar: "📅",
  clock: "⏰",
  gift: "🎁",
  shoppingCart: "🛒",
  tag: "🏷️",
  creditCard: "💳",
  package: "📦",
  percent: "💹",
};


type EmojiType = keyof typeof emojis;

type StatusBadgeProps = {
  title?: string;
  emoji?: any;
  index?: number;
  position?: "right" | "left" | "top" | "bottom";
  className?: string;
};

export default function CustomStatusBadge({
  title,
  emoji,
  index,
  position = "right",
  className,
}: StatusBadgeProps) {
  const offset = index as any * 30;

  const transformMapping = {
    right: `translateX(-3rem) translateY(${offset}px)`,
    left: `translateX(3rem) translateY(${offset}px)`,
    top: `translateY(${offset}px)`,
    bottom: `translateY(-${offset}px)`,
  };

  const style = {
    transform: transformMapping[position],
    [position]: 0,
  };

  return (
    <Badge
      variant="default"
      className={`absolute w-max ${className}`}
      style={style}
    >
      {`${title} ${emojis[emoji as EmojiType]}`}
    </Badge>
  );
}

// USAGE
// const badges = [
//   { title: "Beta", emoji: "rocket" },
//   { title: "Hot", emoji: "fire" },
// ];

// return (
//   <div>
//     {badges.map((badge, index) => (
//       <CustomStatusBadge key={badge.title} {...badge} index={index} />
//     ))}
//   </div>
// );
