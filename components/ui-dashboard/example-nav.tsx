'use client'; import { motion } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRightIcon } from '@radix-ui/react-icons';

const examples = [
  {
    name: "Buttons",
    href: "/ui-elements/buttons",
    code: "https://github.com/remcostoeten/dbnote/blob/develop/components/buttons/CustomButtons.tsx",
  },
  {
    name: "Cards",
    href: "/examples/cards",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/cards",
  },
  {
    name: "Parallax",
    href: "/examples/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },
  {
    name: "Landing",
    href: "/examples/playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/playground",
  },
  {
    name: "Authentication",
    href: "/examples/forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/forms",
  },
  {
    name: "Miscellaneous",
    href: "/examples/music",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/music",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <motion.div
              key={example.href}
              whileHover={{ x: 10, filter: 'blur(2px)' }}
            >
              <Link
                href={example.href}
                className={cn(
                  "flex items-center px-4",
                  pathname?.startsWith(example.href)
                    ? "font-bold text-primary"
                    : "font-medium text-muted-foreground"
                )}
              >
                {example.name}
              </Link>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <ExampleCodeLink
        pathname={pathname === "/" ? "/ui-elements/" : pathname}
      />
    </div>
  );
}

interface ExampleCodeLinkProps {
  pathname: string | null;
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) => pathname?.startsWith(example.href));

  if (!example?.code) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href={example?.code}
        target="_blank"
        rel="nofollow"
        className="absolute view-code right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
      >
        <motion.span
          whileHover={{ x: 10, filter: 'blur(2px)' }}
        >
          View code
        </motion.span>
        <motion.div
          whileHover={{ x: 10, filter: 'blur(2px)' }}
        >
          <ArrowRightIcon />
        </motion.div>
      </Link>
    </motion.div>
  );
}
