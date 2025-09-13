import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../../context/BoardContext";
import TaskModal from "./TaskModal";

export default function TaskCard({ taskId }: { taskId: string }) {
  const { state } = useBoard();
  const task = state.tasks[taskId];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [open, setOpen] = useState(false);
  if (!task) return null;
  return (
    <>
      <div
        className="task-card"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setOpen(true)}
      >
        <h4>{task.title}</h4>
        <small>{task.createdAt}</small>
      </div>

      {open && <TaskModal task={task} onClose={() => setOpen(false)} />}
    </>
  );
}
