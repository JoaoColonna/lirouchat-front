export interface User {
    id: number;
    name: string;
    email: string;
}

export type Message = {
    text: string;
    sender: "model" | "user";
  };