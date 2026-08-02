import { useRef, useState } from "react";

// Logic:
// Get initial cursor positions in pointerdown event
// Set pointer capture for better drag experience
// Get updated pointer position when pointerMove
// Derive dx and dy and add previous translated value to get new translation value
// Set the translate property
// When pointer up, update the translated to dx and dy, release pointer capture

// Additional clamping:
// get container and draggable dimensions and find max translation possible
// clamp to the proper translation

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMaxPossibleTranslation(container: HTMLDivElement, draggableComponent: HTMLDivElement) {
  const containerPosition = container.getBoundingClientRect();
  const draggableComponentPosition = draggableComponent.getBoundingClientRect();
  const containerDimension = {
    height: 0,
    width: 0,
  };
  const draggableComponentDimension = {
    height: 0,
    width: 0,
  };

  containerDimension.width = containerPosition.right - containerPosition.left;
  containerDimension.height = containerPosition.bottom - containerPosition.top;

  draggableComponentDimension.width =
    draggableComponentPosition.right - draggableComponentPosition.left;
  draggableComponentDimension.height =
    draggableComponentPosition.bottom - draggableComponentPosition.top;

  return {
    maxPossibleTranslationX: containerDimension.width - draggableComponentDimension.width,
    maxPossibleTranslationY: containerDimension.height - draggableComponentDimension.height,
  };
}

export const DragAnywhere = () => {
  const [isDragged, setIsDragged] = useState(false);

  const draggableComponentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialPositions = useRef({
    pointerX: 0,
    pointerY: 0,
    translatedX: 0,
    translatedY: 0,
  });

  function handlePointerDown(ev: React.PointerEvent<HTMLDivElement>) {
    if (isDragged) return;
    if (!draggableComponentRef.current) {
      console.error("Cannot locate draggable component");
      return;
    }

    draggableComponentRef.current.setPointerCapture(ev.pointerId);

    initialPositions.current.pointerX = ev.clientX;
    initialPositions.current.pointerY = ev.clientY;

    setIsDragged(true);
  }

  function handlePointerMove(ev: React.PointerEvent<HTMLDivElement>) {
    if (!isDragged) return;
    if (!draggableComponentRef.current) {
      console.error("Cannot locate draggable component");
      return;
    }
    if (!containerRef.current) {
      console.error("Cannot locate container component");
      return;
    }

    const dx = ev.clientX - initialPositions.current.pointerX;
    const dy = ev.clientY - initialPositions.current.pointerY;

    const { maxPossibleTranslationX, maxPossibleTranslationY } = getMaxPossibleTranslation(
      containerRef.current,
      draggableComponentRef.current,
    );

    const newX = clamp(dx + initialPositions.current.translatedX, 0, maxPossibleTranslationX);
    const newY = clamp(dy + initialPositions.current.translatedY, 0, maxPossibleTranslationY);

    draggableComponentRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  function handlePointerUp(ev: React.PointerEvent<HTMLDivElement>) {
    if (!isDragged) return;
    if (!draggableComponentRef.current) {
      console.error("Cannot locate draggable component");
      return;
    }
    if (!containerRef.current) {
      console.error("Cannot locate container component");
      return;
    }

    const dx = ev.clientX - initialPositions.current.pointerX;
    const dy = ev.clientY - initialPositions.current.pointerY;

    const { maxPossibleTranslationX, maxPossibleTranslationY } = getMaxPossibleTranslation(
      containerRef.current,
      draggableComponentRef.current,
    );

    const newX = clamp(dx + initialPositions.current.translatedX, 0, maxPossibleTranslationX);
    const newY = clamp(dy + initialPositions.current.translatedY, 0, maxPossibleTranslationY);

    initialPositions.current.translatedX = newX;
    initialPositions.current.translatedY = newY;

    draggableComponentRef.current.releasePointerCapture(ev.pointerId);

    setIsDragged(false);
  }

  return (
    <div className="bg-background p-4 rounded-2xl shadow-2xl flex flex-col gap-6 h-96">
      <div>
        <h3 className="text-lg font-bold">Drag Anywhere</h3>
        <p className="text-sm text-muted-foreground">Just move the component anywhere</p>
      </div>

      <div
        ref={containerRef}
        className="h-80 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-size-[20px_20px]"
      >
        {/* Draggable component */}
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          ref={draggableComponentRef}
          className={`w-fit select-none rounded-sm overflow-clip border-foreground border backdrop-blur-2xl transition-transform duration-50 ${isDragged ? "hover:cursor-grabbing" : "hover:cursor-grab"}`}
        >
          {/* Component head */}
          <div className="p-2 bg-primary border-foreground border-b flex justify-center items-center">
            <div className="w-6 rounded-2xl h-1 bg-background"></div>
          </div>

          {/* Component body */}
          <div className="px-2 py-4">
            <span className="text-lg font-bold">You can drag me!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
