'use client';
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

/**
 * usePasswordProtection - A custom React hook to protect content with a password.
 * 
 * @param {string} correctPassword The correct password to allow access.
 * @returns {
 *  isAuthenticated: boolean,   // Whether the user is authenticated or not.
 *  password: string,           // The current value of the password input.
 *  setPassword: function,      // Setter function for password state.
 *  handlePasswordSubmit: function // Function to call on form submission.
 * }
 *
 * @example
 * 
 * 
 * import { usePasswordProtection } from '@/ib/usePasswordProtection';
 * 
 * const someComponent: React.FC = () => {
 *   const correctPassword = "mySecret";
 *   const { isAuthenticated, password, setPassword, handlePasswordSubmit } = usePasswordProtection(correctPassword);
 * 
 *   return (
 *     <div>
 *       {isAuthenticated ? (
 *         <>
 *         </>
 *       ) : (
 *         <form onSubmit={handlePasswordSubmit}>
 *           <input 
 *             type="password" 
 *             value={password} 
 *             onChange={(e) => setPassword(e.target.value)} 
 *             placeholder="Enter password"
 *           />
 *           <button type="submit">Submit</button>
 *         </form>
 *       )}
 *     </div>
 *   );
 * };
 * 
 */

export function usePasswordProtection(correctPassword: string) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      toast({ title: "Incorrect password" });
    }
  }

  return {
    isAuthenticated,
    password,
    setPassword,
    handlePasswordSubmit,
  };
}
