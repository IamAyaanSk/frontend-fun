import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import * as d3Geo from "d3-geo";
import * as d3Scale from "d3-scale";
import { useEffect, useRef, useState } from "react";
import type { FeatureCollection, Geometry } from "geojson";
import { useDimensions } from "../../hooks/use-dimensions";
import type { WORLD_MAP_DATA } from "../../data/world-map-data";

// Get topojson for map
// Convert it to geojson
// Create d3 projection
// Render svg and generate path all countries

interface CountryProperties {
  ISO_A3: string;
  NAME: string;
}

interface ToolTipMeta {
  name: string;
  visitors: number;
  countryIsoA3: string;
  clientX: number;
  clientY: number;
}

export function InteractiveWorldMap({ mapData }: { mapData: typeof WORLD_MAP_DATA }) {
  const [topology, setTopology] = useState<Topology | null>(null);
  const [error, setError] = useState(false);
  const [toolTip, setToolTip] = useState<ToolTipMeta | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(mapContainerRef);

  useEffect(() => {
    async function load() {
      const res = await fetch("/world-map/world-countries.json");

      if (!res.ok) {
        setError(true);
        return;
      }

      setTopology(await res.json());
    }

    load();
  }, []);

  if (error || topology == null) {
    return (
      <div>
        <h3>Invalid topology</h3>
      </div>
    );
  }

  let maxVisitors = 0;

  mapData.forEach((country) => {
    if (country.visits > maxVisitors) maxVisitors = country.visits;
  });

  const mapColor = d3Scale
    .scaleLinear<string>()
    .domain([0, maxVisitors / 2, maxVisitors])
    .range(["#f4f5fb", "#6a72e2", "#4f46e5"]);

  // As we know our topology file, using assertion here is ok
  const countries = feature(topology, topology.objects.countries) as FeatureCollection<
    Geometry,
    CountryProperties
  >;

  const filteredCountries = {
    ...countries,
    features: countries.features.filter((country) => country.properties.ISO_A3 !== "ATA"),
  };

  const projection = d3Geo.geoMercator().fitSize([width, height], filteredCountries);

  const pathGenerator = d3Geo.geoPath(projection);

  return (
    <div className="bg-background p-4 rounded-2xl shadow-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold">Interactive World Map</h3>
        <p className="text-sm text-muted-foreground">Hover on it!!</p>
      </div>

      {toolTip && (
        <div
          className="bg-popover flex flex-col gap-2 fixed shadow-2xl rounded-sm p-2 w-32"
          style={{
            left: toolTip.clientX + 10,
            top: toolTip.clientY + 10,
          }}
        >
          <h5 className="text-sm font-medium">{toolTip.name}</h5>
          <div className="flex justify-between items-center">
            <div
              className="w-3 h-3 rounded border/70"
              style={{
                backgroundColor: mapColor(toolTip.visitors),
              }}
            ></div>
            <p className="text-xs font-medium">{toolTip.visitors}</p>
          </div>
        </div>
      )}

      <div
        ref={mapContainerRef}
        className="p-4 flex items-center justify-center w-full h-52 md:h-90 lg:h-100"
      >
        <svg width={width} height={height}>
          {filteredCountries.features.map((country) => {
            const countryD = pathGenerator(country);
            if (!countryD) return null;

            // This can be tighten more by trying different combinations as per data
            const visitors =
              mapData.find(
                (data) => data.isoA3.toLowerCase() === country.properties.ISO_A3.toLowerCase(),
              )?.visits ?? 0;

            const isHovered =
              toolTip?.countryIsoA3.toLowerCase() === country.properties.ISO_A3.toLocaleLowerCase();

            return (
              <path
                className="transition-all"
                d={countryD}
                key={country.properties.NAME}
                stroke="black"
                strokeWidth={isHovered ? 0.5 : 0.25}
                fill={mapColor(visitors)}
                fillOpacity={isHovered ? 1 : 0.9}
                onPointerDown={(e) =>
                  setToolTip({
                    name: country.properties.NAME,
                    countryIsoA3: country.properties.ISO_A3,
                    visitors,
                    clientX: e.clientX,
                    clientY: e.clientY,
                  })
                }
                onPointerMove={(e) => {
                  setToolTip({
                    name: country.properties.NAME,
                    countryIsoA3: country.properties.ISO_A3,
                    visitors,
                    clientX: e.clientX,
                    clientY: e.clientY,
                  });
                }}
                onPointerLeave={() => setToolTip(null)}
                onPointerUp={() => setToolTip(null)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
