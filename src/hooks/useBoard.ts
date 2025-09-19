import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used inside BoardProvider");
  return ctx;
};