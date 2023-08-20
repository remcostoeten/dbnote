import { ChangeEvent, useState } from "react";

const useInputState = (initialValue: string = ""): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return [value, handleChange];
};

