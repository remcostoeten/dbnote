'use client';
import '@/components/core/styles/home.scss';
import ContactButton from '../../components/core/components/ContactButton/index';
import { Header } from '@/components/core/Header';
import MenuManager from '../../components/core/components/Menu/MenuManager';

export default function page() {
  return (
    <>
      <MenuManager>

      <Header />
      <div className="main-container" id="main-container"></div>
        <h1>
          Bleu <br /> Blanc <br /> Studio
        </h1>
        <ContactButton />
      </MenuManager></>
  );
};



