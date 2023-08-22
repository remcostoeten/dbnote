import React from "react"
import styles from "@/styles/modules/cursor.module.scss"

export default function page() {
    return (
        <div className="flex  flex-col gap-4">
            <h2 className="text-2xl font-semibold"> Hover image</h2>
            <div className="flex  gap-4">
                <div className="cursor-hover">
                    <div
                        className={styles.interactable}
                        data-type="video"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1657779582398-a13b5896ff19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)",
                        }}
                    />
                </div>
                <div className="cursor-hover">
                    <div
                        className={styles.interactable}
                        data-type="video"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1657779582398-a13b5896ff19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)",
                        }}
                    ></div>
                </div>
            </div>
            <h1 className="cursor-hover" data-type="video">test</h1>
        </div>
    )
}
