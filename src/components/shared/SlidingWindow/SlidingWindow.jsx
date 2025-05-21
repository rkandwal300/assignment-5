import React, { useRef, useState } from "react";
import { dataList } from "./data";
import { Card, CardContent } from "@/components/ui/card";

const CARD_WINDOW = 25;
const TRIGGER_DOWN_INDEX = 15;
const TRIGGER_UP_INDEX = 5;

function SlidingWindow() {
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState(() => dataList.slice(0, CARD_WINDOW));
  const scrollContainerRef = useRef(null);

  const updateWindow = (newStart) => {
    const boundedStart = Math.max(
      0,
      Math.min(newStart, dataList.length - CARD_WINDOW)
    );
    const nextSlice = dataList.slice(boundedStart, boundedStart + CARD_WINDOW);
    setStartIndex(boundedStart);
    setData(nextSlice);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.children?.[0];
    const cardHeight = firstCard?.offsetHeight;

    if (!cardHeight) return;

    const scrollTop = container.scrollTop;
    const visibleCardIndex = Math.floor(scrollTop / cardHeight);

    console.log({
      visibleCardIndex,
      cardHeight,
      startIndex,
    });

    if (
      visibleCardIndex >= TRIGGER_DOWN_INDEX &&
      startIndex + CARD_WINDOW < dataList.length
    ) {
      updateWindow(startIndex + 1);
    }

    if (visibleCardIndex <= TRIGGER_UP_INDEX && startIndex > 0) {
      updateWindow(startIndex - 1);
    }
  };
 
 
  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex flex-col gap-4 p-4 overflow-auto "
    >
      {data.map((val) => (
        <Card key={val}>
          <CardContent>{val}</CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SlidingWindow;
