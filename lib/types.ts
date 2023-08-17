export interface Note {
    id: string;
    title: string;
    userId: string;
    content: string;
    category: string;
    createdAt: any; 
    status: string;
    label: string;
    subject: string;
    priority: string;
  }
  
  export interface Thought {
    id: string;
    title?: string;
    userId: string;
    description?: string;
    createdAt: any;
    userName?: string;
    content?: string;
    label?: string;
    subject: string;
    selectedDate: any;
  }
