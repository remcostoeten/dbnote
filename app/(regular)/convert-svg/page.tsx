'use client';
import SvgInput from './components/SvgInput';
import CssOutput from './components/CssOutput';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const SvgConvert = () => {
  const [svg, setSvg] = useState<string>('');
  const [beforeContent, setBeforeContent] = useState<string>('');

  return (
    <>
    <Card className="container p-6 flex flex-col gap-2">
    <div className="mb-4">
      <SvgInput setSvg={setSvg} />
        <Label htmlFor="beforeContent">Before Content:</Label>
        <Input type="text" id="beforeContent" value={beforeContent} onChange={(e) => setBeforeContent(e.target.value)} />
        </div>
      <CssOutput svg={svg} beforeContent={beforeContent} />
      </Card></>
  );
};

export default SvgConvert;
