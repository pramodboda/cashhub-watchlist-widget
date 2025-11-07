// components/SortableAssetItem.tsx
import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type {SortableAssetItemProps} from "../../types/types";



const SortableAssetItem: React.FC<SortableAssetItemProps> = ({ item, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
       <Box
            {...attributes}
            {...listeners}
            sx={{ display: "flex", alignItems: "center", cursor: "grab" }}
          >
            <IconButton size="small" aria-label="drag" sx={{ mr: 1 }}>
              <DragIndicatorIcon />
            </IconButton>
          </Box>
      <ListItemAvatar>
        <Avatar>{item.symbol.charAt(0)}</Avatar>
      </ListItemAvatar>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
         

          <ListItemText primary={item.symbol} secondary={item.name} />
        </Box>

        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          {item.tags?.map((t) => (
            <Chip size="small" key={t} label={t} />
          ))}
        </Box>
      </Box>
    </ListItem>
  );
};

export default SortableAssetItem;
