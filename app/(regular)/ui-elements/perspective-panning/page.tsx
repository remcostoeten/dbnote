'use client';
import { MouseEvent, useEffect, useRef } from "react";
import PageSetting from "@/components/ui-dashboard/PageSetting";

export default function Home() {
  const plane = useRef<HTMLDivElement | null>(null);
  let maxRotate = 45;


  const changeMaxRotate = (e: MouseEvent<HTMLDivElement>) => {
      if (maxRotate === 45) {
        maxRotate = 90;
      }
    };


  useEffect(() => {
    document.body.classList.add("d-perspective");
    return () => {
      document.body.classList.remove("d-perspective");
    };
  }, []);

  const manageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (plane.current) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const perspective = window.innerWidth * 4;
      const rotateX = maxRotate * x - maxRotate / 2;
      const rotateY = (maxRotate * y - maxRotate / 2) * -1;
      plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
  };

  return (
    <>
      <PageSetting
        settings={[
          {
            id: "necessary",
            title: "Toggle strenght",
            description: "Toggle the strenght of the perspective effect.",
            defaultChecked: true,
            onToggle: (_isChecked) => {
              changeMaxRotate;
            },
          },
        ]} description={""} />
      <div className="perspective-text">
        <div
          onMouseMove={(e) => {
            manageMouseMove(e);
          }}
          className="perspective-text__inner "
        >
     <main className="container mx-auto p-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tellus ac justo hendrerit, a luctus dolor laoreet. Vivamus ullamcorper felis vel est iaculis, a ullamcorper tortor convallis.</p>
        </section>
        
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Service 1</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Service 2</h2>
            <p className="text-gray-700">Sed euismod tellus ac justo hendrerit, a luctus dolor laoreet.</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Service 3</h2>
            <p className="text-gray-700">Vivamus ullamcorper felis vel est iaculis, a ullamcorper tortor convallis.</p>
          </div>
        </section>
      </main>
      t
          </div>
      </div>
    </>
  );
}
