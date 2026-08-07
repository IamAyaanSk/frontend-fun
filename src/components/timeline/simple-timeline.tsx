interface TimelineProps {
  events: {
    status: string;
    colorHash: string;
    timeString: string;
    title: string;
  }[];
}

export const SimpleTimeline = ({ events }: TimelineProps) => {
  return (
    <div className="bg-background p-4 rounded-2xl shadow-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold">Simple Timeline</h3>
        <p className="text-sm text-muted-foreground">Clean and minimal timeline for events</p>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-popover py-3 px-8 shadow-lg rounded-2xl">
          {events.map((event, index) => (
            <div className="flex gap-4 p-1.5">
              {/* circle and line */}
              <div className="flex flex-col gap-2 items-center w-fit">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: event.colorHash,
                  }}
                ></div>

                {events.length - 1 !== index && (
                  <div className="w-0.5 bg-muted-foreground/20 h-5"></div>
                )}
              </div>

              <div className="flex gap-0.5 flex-col">
                <p className="text-xs text-muted-foreground/90 font-semibold">{event.title}</p>
                <p className="text-xs flex gap-1.5">
                  <span className="text-muted-foreground/80">{event.status}</span>{" "}
                  <span className="text-muted-foreground/60">{event.timeString}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
