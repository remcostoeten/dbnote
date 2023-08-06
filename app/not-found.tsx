"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
    const [showError, setShowError] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            // play audio
            audioRef.current?.play();
        }, 1000);
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(false);
            router.push("/");
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const toHome = () => {
        setShowError(false);
        router.push("/");
    };

    if (!showError) {
        return null;
    }

    return (
        <div className="error-wrapper" href="/">
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
                    <button type="button" onClick={() => {
                        router.push("/");
                        window.location.reload();
                    }}>
                        <span className="orange">&lt;--</span> Go back to the home page and reload
                    </button>

                </div>
            </div>
            <audio ref={audioRef} src="/music.mp3" loop autoPlay />
        </div>
    )
}