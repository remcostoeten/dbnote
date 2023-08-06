"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import PageSetting from "@/components/ui-dashboard/PageSetting"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function NotFound() {
    const [showError, setShowError] = useState<boolean>(true)
    const [playAbba, setPlayAbba] = useState<boolean>(false)
    const elevatorRef = useRef<HTMLAudioElement>(null)
    const abbaRef = useRef<HTMLAudioElement>(null)
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            toast({
                title: "Now playing generic_elevator.mp3",
            })
            elevatorRef.current?.play()
        }, 1000)
    }, [])

    const switchSong = () => {
        console.log("test")
        setPlayAbba(!playAbba)
    }

    useEffect(() => {
        if (playAbba) {
            setTimeout(() => {
                toast({
                    title: "🎉 Now playing abba - dancing queen.mp3 💃",
                })
                elevatorRef.current?.pause()
                abbaRef.current?.play()
            }, 1000)
        } else {
            abbaRef.current?.pause()
        }
    }, [playAbba])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(false)
            router.push("/")
        }, 30000)

        return () => clearTimeout(timer)
    }, [])

    const toHome = () => {
        setShowError(false)
        router.push("/")
    }

    if (!showError) {
        return null
    }
    return (
        <div className="error-wrapper">
            <div className="flex items-center p-8 justify-between space-x-2">
                <div className="flex  gap-4 flex-col items-center justify-between space-x-2">
                    <Label htmlFor="song" className="flex flex-col space-y-1">
                        <span className="font-2xl font-semibold">Switch song</span>
                    </Label>
                    <Switch
                        id="song"
                        onClick={(e) => switchSong()}
                    />
                </div>
            </div>

            <div className="error">
                <div className="wrap">
                    <div className="error">
                        <pre>
                            <code>
                                {"\n"}
                                {"\t"} <span className="green">&lt;!</span>
                                <span>DOCTYPE html</span>
                                <span className="green">&gt;</span>
                                {"\n"}
                                <span className="orange">&lt;html&gt;</span>
                                {"\n"}
                                {"    "}
                                <span className="orange">&lt;style&gt;</span>
                                {"\n"}
                                {"   "}* {"{"}
                                {"\n"}
                                {"\t"}
                                {"\t"}
                                {"        "}
                                <span className="green">u dun</span>:
                                <span className="blue">goofed</span>;{"\n"}
                                {"}"}
                                {"\n"}
                                {"     "}
                                <span className="orange">&lt;/style&gt;</span>
                                {"\n"} <span className="orange">&lt;body&gt;</span> {"\n"}
                                {"              "}.... YOU MADE A TYPO!{"\n"}
                                {"\t"}
                                {"\t"}
                                {"\t"}
                                {"\t"}ROUTE IS NOT FOUND!{"\n"}
                                {"\t"}
                                {"\t"}
                                {"\t"}
                                {"\t"}
                                <span className="comment">
                                    &lt;!--The file you are looking for, {"\n"}
                                    {"\t"}
                                    {"\t"}
                                    {"\t"}
                                    {"\t"}
                                    {"\t"}is not where you think it is.--&gt;{"\n"}
                                    {"\t"}
                                    {"\t"}
                                </span>
                                {"\n"} <span className="orange" /> {"\n"}
                                {"\t"}
                                {"\t"}
                                {"\t"}
                                {"  "}
                                {"\n"}
                                {"\n"}
                                {"\n"}
                            </code>
                        </pre>
                    </div>
                    <code>
                        <br />
                        <span className="info">
                            <br />
                            <span className="orange">&nbsp;&lt;/body&gt;</span>
                            <br />
                            <span className="orange">&lt;/html&gt;</span>
                        </span>
                    </code>
                    <button
                        type="button"
                        onClick={() => {
                            router.push("/")
                            window.location.reload()
                        }}
                    ></button>
                </div>
            </div>
            <audio ref={elevatorRef} src="/music.mp3" loop autoPlay />

            <audio ref={abbaRef} src="/abba.mp3" loop />
        </div>
    )
}
