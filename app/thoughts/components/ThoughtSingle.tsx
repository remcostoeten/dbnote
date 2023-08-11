import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const ThoughtDetail = ({ thought }) => {
    return (
        thought && (
            <div className="icon-card border flex flex-col mb-4 justify-between rounded-md break-words p-6">
                <h2>{thought.title || "No title"}</h2>
                <ReactMarkdown
                    className="text-[#5D5C63] font-notes"
                    rehypePlugins={[rehypeRaw]}
                >
                    {thought.description || "No description"}
                </ReactMarkdown>
            </div>
        )
    )
}

export default ThoughtDetail;
