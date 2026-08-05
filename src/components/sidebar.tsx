import { Link } from "@tanstack/react-router";
import { Route as dragAndDropRoute } from "../routes/drag-and-drop";
import { Route as worldMpaRoute } from "../routes/world-map";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Drag02Icon, Map, More01FreeIcons } from "@hugeicons/core-free-icons";

export const SidebarItem = ({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: IconSvgElement;
}) => {
  return (
    <li>
      <Link
        className="text-sm flex gap-2 items-center hover:bg-muted transition-all p-2 rounded-sm hover:text-muted-foreground"
        activeProps={{
          className:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        }}
        to={to}
      >
        <HugeiconsIcon size={20} icon={icon} />
        <span className="">{label}</span>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-background p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xs text-muted-foreground/80">Microprojects</h2>
        <ul className="flex flex-col gap-1">
          <SidebarItem to={dragAndDropRoute.to} label="Drag and drop" icon={Drag02Icon} />
          <SidebarItem to={worldMpaRoute.to} label="World map" icon={Map} />
          <SidebarItem to={"/"} label="More soon" icon={More01FreeIcons} />
        </ul>
      </div>
    </aside>
  );
};
