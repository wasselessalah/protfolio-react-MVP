// src/components/CustomButton.tsx
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  text: string;
  link: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
}

export default function CustomButton({ 
  text, 
  link, 
  variant = "default" 
}: CustomButtonProps){
  return (
    <Button asChild variant={variant} size="lg">
      <a href={link}>{text}</a>
    </Button>
  );
}