import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

const createInput = (placeholder: string, value: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void) => (
  <Input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
  />
);

