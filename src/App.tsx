// src/App.tsx
import { ThemeProvider } from "@/context/ThemeContext";
import AppRouter from "@/router";
import ScrollTopButton from "@/components/shared/ScrollTopButton";

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      <ScrollTopButton />
    </ThemeProvider>
  );
}