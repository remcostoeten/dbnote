import { title } from 'process';
import IconMap from './IconMap';

export default function IconGrid() {
    return (
        <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2
                    className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
                >
                    Tools I work with
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    These are the tools I use from a day to day basis. I&apos;m always looking for new tools to try out. Having a passion for native (s)css but lately been using tailwindcss more and more and just like everyone else I&apos;m a big fan.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">

                {IconMap.map(({ icon }) => (
                ))}
            </div>
            <div className="mx-auto text-center md:max-w-[58rem]">
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Taxonomy also includes a blog and a full-featured documentation site built using Contentlayer and MDX.
                </p>
            </div>
        </section>
    );
}