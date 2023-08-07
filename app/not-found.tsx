"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

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
            <div className="flex items-center p-8 flex-end space-x-2 justify-between">
                <Link className="text-2xl font-medium" href="/">Return back to home</Link>
                <div className="flex items-center p-8 flex-end space-x-2 justify-between content-center">
                    <Label htmlFor="song" className="flex flex-col space-y-1">
                        <span className="font-2xl font-semibold">Switch song</span>
                    </Label>
                    <Switch
                        id="song"
                        onClick={(e) => switchSong()}
                    />
                </div>
            </div>

            <div className="error">404</div>
            <br /><br />
            <span className="info">File not found</span>
            <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" />            <audio ref={elevatorRef} src="/music.mp3" loop autoPlay />

            <audio ref={abbaRef} src="/abba.mp3" loop />
        </div>
    )
}
