import React, { useRef, useState } from "react";

// ! Appending nodes programatically is not recommended in react. I am just exploring the drag and drop api here in a vanilla js way!!

export const SimpleDrag = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  //   function handleDragStart(ev: React.DragEvent<HTMLDivElement>) {
  //     // This is what we would typically do in vanilla js
  //     ev.dataTransfer?.setData("text", ev.currentTarget.id);
  //   }

  function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function handleDrop(_ev: React.DragEvent<HTMLDivElement>) {
    setIsDropped(true);

    // We append this in DOM in vanilla js
    // const draggedComponentId = ev.dataTransfer?.getData("text");
    // if (draggedComponentId != null) {
    //   const draggedComponent = document.getElementById(draggedComponentId);
    //   if (draggedComponent != null) {
    //     ev.currentTarget.appendChild(draggedComponent);
    //     setIsDropped(true);
    //   }
    // }
  }

  function handleReset() {
    // if (draggableRef.current && containerRef.current) {
    //   containerRef.current.prepend(draggableRef.current);
    // }

    setIsDropped(false);
  }

  return (
    <div className="bg-background p-4 rounded-2xl shadow-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold">Simple Drag and Drop</h3>
        <p className="text-sm text-muted-foreground">
          A simple implementation of drag and drop with browser APIs
        </p>
      </div>

      <div ref={containerRef} className="flex items-center h-full">
        {!isDropped && (
          <div
            //   onDragStart={handleDragStart}
            ref={draggableRef}
            draggable={true}
            className="w-20 border-4 border-accent h-20 p-2 rounded-xl text-xs bg-secondary text-primary-foreground flex items-center text-center"
          >
            <span>Yo! I am draggable</span>
          </div>
        )}

        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="bg-muted flex items-center ml-auto justify-center border-dotted w-96 h-48 rounded-xl border border-primary"
        >
          {!isDropped && <span className="text-xs">Drag box here</span>}
          {isDropped && (
            <div
              //   onDragStart={handleDragStart}
              ref={draggableRef}
              className="w-20 border-4 border-accent h-20 p-2 rounded-xl text-xs bg-secondary text-primary-foreground flex items-center text-center"
            >
              <span>Yo! I am draggable</span>
            </div>
          )}
        </div>
      </div>
      <button
        className={`w-fit text-xs bg-primary text-primary-foreground py-1 px-4 rounded-sm ${isDropped ? "visible" : "invisible"}`}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
