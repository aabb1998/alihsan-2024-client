import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import worldMapData from "./world.json";
import { HoverComponent } from "./HoverComponent";
import { getCountries } from "../../features/home/homeSlice";

const WorldMap = () => {
  const { mapCountries } = useSelector((state) => state.mapCountries);

  const getActiveCountries = ({ geo, index }) => {
    const {
      properties: { isActive },
    } = geo;
    return isActive ? "rgb(36, 65, 128)" : "rgb(211, 212, 216)";
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <ComposableMap
        style={{ width: "100%" }}
        projection="geoEquirectangular" // set the projection to geoEquirectangular
        projectionConfig={{
          scale: 140,
          center: [0, 0],
        }}
        height={300}

      >
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={worldMapData}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-tooltip-id={"worldmap-tooltip"}
                  data-tooltip-content={geo.properties.name}
                  data-tooltip-item-index={index}
                  data-some-relevant-attr={geo.properties?.isActive}
                  style={{
                    default: {
                      fill: getActiveCountries({ geo, index }),
                      outline: "none",
                      borderColor: "white",
                      borderWidth: 0.5,
                    },
                    hover: {
                      fill: geo?.properties?.isActive
                        ? "rgb(255, 214, 0)"
                        : "rgb(211, 212, 216)",
                      outline: "none",
                      borderWidth: 0.5,
                      cursor: "pointer",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip
        id="worldmap-tooltip"
        style={{ backgroundColor: "unset", padding: 0 }}
        render={({ content, activeAnchor }) =>
          activeAnchor?.getAttribute("data-some-relevant-attr") ? (
            <HoverComponent
              mapCountries={mapCountries}
              content={content}
              activeAnchor={activeAnchor}
            />
          ) : (
            ""
          )
        }
      />
    </div>
  );
};

export default React.memo(WorldMap);
