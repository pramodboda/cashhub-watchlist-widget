import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FundItemProps {
  id: string;
}

const FundItem: React.FC<FundItemProps> = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px 16px",
    borderRadius: 8,
    backgroundColor: isDragging ? "#1976d2" : "#eeeeee",
    color: isDragging ? "#fff" : "#000",
    boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.25)" : "none",
    cursor: "grab",
    userSelect: "none",
    fontWeight: 500,
    textAlign: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

export default FundItem;
