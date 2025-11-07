// components/CashhubWatchlist.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  List,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableAssetItem from "./SortableAssetItem";

import type {Asset} from "../../types/types";

const STORAGE_KEY = "cashhub_watchlist_v1";

const DEFAULT_ASSETS: Asset[] = [
  { id: uuidv4(), symbol: "NIFTY", name: "Nifty 50", type: "Equity", tags: ["Index"] },
  { id: uuidv4(), symbol: "SENSEX", name: "Sensex", type: "Equity", tags: ["Index"] },
  { id: uuidv4(), symbol: "GOLD", name: "Gold (XAU)", type: "Commodity", tags: ["Hedge"] },
  { id: uuidv4(), symbol: "GOVT", name: "Governmen`t Bonds", type: "Debt", tags: ["Safe"] },
  { id: uuidv4(), symbol: "BTC", name: "Bitcoin", type: "Crypto", tags: ["High Risk"] },
];

export default function CashhubWatchlist({
  initial = DEFAULT_ASSETS,
  persistKey = STORAGE_KEY,
}: {
  initial?: Asset[];
  persistKey?: string;
}) {
  const [items, setItems] = useState<Asset[]>(() => {
    try {
      const raw = sessionStorage.getItem(persistKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return initial;
  });

  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  useEffect(() => {
    sessionStorage.setItem(persistKey, JSON.stringify(items));
  }, [items, persistKey]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    if (!newSymbol.trim()) return;
    const asset: Asset = {
      id: uuidv4(),
      symbol: newSymbol.trim().toUpperCase(),
      name: newName.trim() || newSymbol.trim(),
      type: newType.trim() || undefined,
      tags: newType ? [newType] : undefined,
    };
    setItems((prev) => [asset, ...prev]);
    setNewSymbol("");
    setNewName("");
    setNewType("");
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Cashhub Watchlist
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField
          label="Symbol"
          size="small"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          sx={{ minWidth: 120 }}
        />
        <TextField
          label="Display name"
          size="small"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="Type"
          size="small"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          sx={{ minWidth: 140 }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <List dense sx={{ width: "100%" }}>
            {items.map((item) => (
              <SortableAssetItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </List>
        </SortableContext>
      </DndContext>

      <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption">Drag to reorder • Session saved</Typography>
        <Button size="small" onClick={() => setItems(initial)}>Reset</Button>
      </Box>
    </Paper>
  );
}
