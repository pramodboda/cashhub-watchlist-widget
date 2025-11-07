import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core"; // 👈 Type-only import
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import FundItem from "./FundItem";



// Types
type Asset = {
  id: string;
  symbol: string; // e.g. "NIFTY", "Gold"
  name: string; // e.g. "Nifty 50 Index"
  type?: string; // e.g. "Equity", "Commodity", "Debt"
  tags?: string[];
  };
  
  
  const STORAGE_KEY = "cashhub_watchlist_v1";
  
  
  // Default sample data
  const DEFAULT_ASSETS: Asset[] = [
  { id: uuidv4(), symbol: "NIFTY", name: "Nifty 50", type: "Equity", tags: ["Index"] },
  { id: uuidv4(), symbol: "SENSEX", name: "Sensex", type: "Equity", tags: ["Index"] },
  { id: uuidv4(), symbol: "GOLD", name: "Gold (XAU)", type: "Commodity", tags: ["Hedge"] },
  { id: uuidv4(), symbol: "GOVT", name: "Government Bonds", type: "Debt", tags: ["Safe"] },
  { id: uuidv4(), symbol: "BTC", name: "Bitcoin", type: "Crypto", tags: ["High Risk"] },
  ];

  
const FundsList: React.FC = () => {
  const [items, setItems] = useState<string[]>([
    "Item A",
    "Item B",
    "Item C",
    "Item D",
  ]);
  

  // Configure sensors (mouse + keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id as string);
        const newIndex = prevItems.indexOf(over.id as string);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]} // 🔒 Lock drag to vertical axis
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div
          style={{
            width: 260,
            margin: "auto",
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {items.map((id) => (
            <FundItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default FundsList;
