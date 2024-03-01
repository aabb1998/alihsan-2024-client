import React, { useEffect, useState } from "react";
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
// import { getCountries } from "../../features/adminCountry/adminCountrySlice";
import { getCountries } from "../../features/home/homeSlice";
import { MinusIcon, PlusIcon } from "../../theme/svg-icons";
const ZOOM_STEP = 0.5,
  ZOOM_MAX = 3,
  ZOOM_MIN = 1;
const HEIGHT = 300,
  WIDTH = 640;

const WorldMap = () => {
  const { mapCountries: countries } = useSelector(
    (state) => state.mapCountries
  );
  // const { countries } = useSelector((state) => state.adminCountries);

  const allIds = countries?.map((obj) => obj.countryName);

  const getActiveCountries = ({ geo, index }) => {
    const {
      properties: { isActive },
    } = geo;
    return isActive ? "rgb(36, 65, 128)" : "rgb(211, 212, 216)";
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getCountries());
    dispatch(getCountries());
  }, []);

  worldMapData?.objects?.world?.geometries?.forEach((e) => {
    if (e && e.properties) {
      if (allIds?.includes(e.properties.name)) {
        e.properties.isActive = true;
      }
    }
  });

  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  return (
    <>
      <div style={{}}>
        <ComposableMap
          style={{ width: "100%" }}
          projection="geoEquirectangular" // set the projection to geoEquirectangular
          projectionConfig={{
            scale: 100,
          }}
          height={HEIGHT}
          width={WIDTH}
        >
          <ZoomableGroup
            filterZoomEvent={(e) => e.type !== "wheel"}
            onMoveEnd={(e) => setMapCenter(e.coordinates)}
            zoom={mapZoom}
            translateExtent={[
              [0, 0],
              [WIDTH, HEIGHT],
            ]}
            center={mapCenter}
          >
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
                        cursor: geo?.properties?.isActive
                          ? "pointer"
                          : "default",
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
          style={{
            backgroundColor: "unset",
            padding: 0,
            position: "absolute",
            zIndex: "40",
          }}
          render={({ content, activeAnchor }) =>
            activeAnchor?.getAttribute("data-some-relevant-attr") ? (
              <HoverComponent
                mapCountries={countries?.map((obj) => ({
                  ...obj,
                  name: obj.countryName,
                  country: obj.countryCode,
                  text: obj.description,
                }))}
                content={content}
                activeAnchor={activeAnchor}
              />
            ) : (
              ""
            )
          }
        />
      </div>
      <div className="relative">
        <div className="absolute left-4 z-0 flex flex-col gap-2 bottom-10 sm:bottom-20 sm:left-10">
          <div
            className="flex items-center justify-center w-6 h-6 rounded cursor-pointer md:w-10 md:h-10 bg-primary-200"
            onClick={() =>
              setMapZoom((z) => Math.min((z += ZOOM_STEP), ZOOM_MAX))
            }
          >
            <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
              <PlusIcon />
            </span>
          </div>
          <div
            className="flex items-center justify-center w-6 h-6 rounded cursor-pointer md:w-10 md:h-10 bg-primary-200"
            onClick={() =>
              setMapZoom((z) => Math.max((z -= ZOOM_STEP), ZOOM_MIN))
            }
          >
            <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
              <MinusIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
// const modifiedArray = dataArray.map(obj => ({ ...obj, countryname: obj.name, name: undefined }));

export default React.memo(WorldMap);

