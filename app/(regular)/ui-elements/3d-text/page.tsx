'use client';
import { MouseEvent, useEffect, useRef } from "react";
import Text3d from "@/components/Text3d";
import PageSetting from "@/components/ui-dashboard/PageSetting";

export default function Home() {
  const plane = useRef<HTMLDivElement | null>(null);
  const maxRotate = 45;

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

  const changeColorToggle = () => {
    document.body.classList.toggle("d-perspective--color");
  };

  return (
    <>
      <PageSetting
        settings={[
          {
            id: "necessary",
            title: "Toggle color",
            description: "Fancy some teal?.",
            defaultChecked: true,
            onToggle: (_isChecked) => {
              document.body.classList.toggle("d-perspective--color");
            },
          },
        ]} description={""} />
      <div className="perspective-text">
        <div
          className="perspective-text__inner "
        >
          <div
            ref={plane}
            className="flex flex-col gap-8 perspective-text__wrapper"
          >
            <Text3d primary={"Hover me"} secondary={"Woooooo"} />
            <Text3d primary={"Also me!"} secondary={"Boooooooo"} />
            <Text3d primary={"Usecase?"} secondary={"I don't know"} />
            <Text3d primary={"But cool"} secondary={"I suppose"} />
          </div>
        </div>
      </div>
    </>
  );
}
