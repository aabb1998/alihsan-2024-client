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
const ZOOM_STEP = 0.5, ZOOM_MAX = 3, ZOOM_MIN = 1;
const HEIGHT = 300, WIDTH = 640;

const WorldMap = () => {
  const { mapCountries: countries } = useSelector((state) => state.mapCountries);
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
    dispatch(getCountries())

  }, []);

  worldMapData?.objects?.world?.geometries?.forEach((e) => {
    if (e && e.properties) {
      if (allIds?.includes(e.properties.name)) {
        e.properties.isActive = true;
      }
    }
  });

	const [ mapZoom, setMapZoom ] = useState(1)
	const [ mapCenter, setMapCenter ] = useState([0,0])

  return (
    <div style={{ position: "relative" }}>
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
					filterZoomEvent={e => e.type!=='wheel'}
					onMoveEnd={(e) => setMapCenter(e.coordinates)}
					zoom={mapZoom}
					translateExtent={[
						[0, 0],
						[WIDTH, HEIGHT]
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
			<div className="absolute bottom-10 right-10 flex flex-col gap-2">
				<div className="h-10 w-10 flex items-center justify-center bg-primary-200 rounded cursor-pointer" onClick={() => setMapZoom(z => Math.min(z += ZOOM_STEP, ZOOM_MAX))}>
					<PlusIcon />
				</div>
				<div className="h-10 w-10 flex items-center justify-center bg-primary-200 rounded cursor-pointer" onClick={() => setMapZoom(z => Math.max(z -= ZOOM_STEP, ZOOM_MIN))}>
					<MinusIcon />
				</div>
			</div>
    </div>
  );
};
// const modifiedArray = dataArray.map(obj => ({ ...obj, countryname: obj.name, name: undefined }));

export default React.memo(WorldMap);

// {
//   "id": 8,
//   "countryCode": "AX",
//   "countryName": "Aland Islands",
//   "description": "name",
//   "image": "https://api.alihsan.dev.devateam.com/public/uploads/map-country/1705918998900-alihsan-image (6).png"
// },

// {
//   "name": "India",
//   "country": "IN",
//   "text": "Map is being !",
//   "image": "https://web.alihsan.dev.devateam.com/images/banner/projects/6.jpg"
// },
