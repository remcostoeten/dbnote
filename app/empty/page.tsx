"use client"
// pages/index.tsx
import React, { useState } from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  const [interacting, setInteracting] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setInteracting(true);
  };

  const handleMouseLeave = () => {
    setInteracting(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '0 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>Next.js TypeScript Migration</title>
        <meta name="description" content="Next.js TypeScript migration example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          padding: '5rem 0',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="interactable"
          data-type="video"
          style={{
            aspectRatio: '1 / 1.5',
            width: 'clamp(120px, 40vmin, 600px)',
            backgroundPosition: 'center 50%',
            backgroundSize: '100%',
            opacity: 0.4,
            transition: 'background-size 400ms ease, opacity 400ms ease',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1657779582398-a13b5896ff19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)',
          }}
          onMouseEnter={() => {
            handleMouseEnter();
            handleMouseMove;
          }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        ></div>

        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'fixed',
            zIndex: 10000,
            pointerEvents: 'none',
            transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
            transition: 'transform 200ms ease',
          }}
          className={interacting ? 'interacting' : ''}
        ></div>
      </main>
    </div>
  );
};

export default Home;
