import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import * as d3 from "d3-geo";
import { useEffect, useRef, useState } from "react";
import type { FeatureCollection, Geometry } from "geojson";
import { useDimensions } from "../../hooks/use-dimensions";

// Get topojson for map
// Convert it to geojson
// Create d3 projection
// Render svg and generate path all countries

interface CountryProperties {
  ISO_A3: string;
  NAME: string;
}

export function WorldMap() {
  const [topology, setTopology] = useState<Topology | null>(null);
  const [error, setError] = useState(false);
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

  // As we know our topology file, using assertion here is ok
  const countries = feature(topology, topology.objects.countries) as FeatureCollection<
    Geometry,
    CountryProperties
  >;

  const filteredCountries = {
    ...countries,
    features: countries.features.filter((country) => country.properties.ISO_A3 !== "ATA"),
  };

  const projection = d3.geoMercator().fitSize([width, height], filteredCountries);

  const pathGenerator = d3.geoPath(projection);

  return (
    <div className="bg-background p-4 rounded-2xl shadow-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold">Simple World Map</h3>
        <p className="text-sm text-muted-foreground">
          A simple world map created with svg using topojson and d3 for projection
        </p>
      </div>

      <div
        ref={mapContainerRef}
        className="p-4 flex items-center justify-center w-full h-52 md:h-90 lg:h-100"
      >
        <svg width={width} height={height}>
          {filteredCountries.features.map((country) => {
            const countryD = pathGenerator(country);
            if (!countryD) return null;

            return (
              <path
                d={countryD}
                key={country.properties.NAME}
                stroke="lightGrey"
                strokeWidth={0.5}
                fill="grey"
                fillOpacity={0.7}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
