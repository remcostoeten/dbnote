export interface Note {
    id: string;
    title: string;
    userId: string;
    content: string;
    category: string;
    createdAt: any; 
  }
  
  export interface Thought {
    id: string;
    title?: string;
    description?: string;
    createdAt: any;
    userName?: user.displayName;
    userId: string;  
    subject: string;
    selectedDate: any;

  }