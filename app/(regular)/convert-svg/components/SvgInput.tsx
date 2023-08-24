'use client';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface SvgInputProps {
  setSvg: (svg: string) => void;
}

const SvgInput: React.FC<SvgInputProps> = ({ setSvg }) => {
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleSvgChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedSvg = e.clipboardData.getData('text/plain');
    setTextareaValue(pastedSvg);
    setSvg(pastedSvg);
  };

  return (
    <>
      <Textarea rows={12} className="w-[300px]" value={textareaValue} onChange={handleSvgChange} onPaste={handlePaste}></Textarea>
    </>
  );
};

export default SvgInput;
