interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {

    return (
        <div className="container">
            <main className="flex w-full flex-1 overflow-hidden custom-buttons gap-4 p-12  flex-col border border-[#27272a] pb-28">
                {children}
            </main>
        </div >
    )
}
