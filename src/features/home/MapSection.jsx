import React, { useState, useEffect, useRef } from "react";
import WorldMap from "react-svg-worldmap";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "./homeSlice";
import {
  TransformWrapper,
  TransformComponent,
  onTransformed,
} from "react-zoom-pan-pinch";
import { ZoomInIcon, ZoomOutIcon } from "../../theme/svg-icons";
import Button from "../../components/Button";
import Img from "../../components/Image";
function formattedNumber(num, digits) {
  if (typeof num === "undefined") return "";
  const magnitude = [
    { value: 1e9, text: " billion " },
    { value: 1e6, text: " million " },
    { value: 1e3, text: " thousand " },
    { value: 1, text: "" },
  ].find((magnitude) => num >= magnitude.value);
  if (magnitude) {
    return (
      (num / magnitude.value)
        .toFixed(digits)
        .replace(/\.0+$|(?<number>\.[0-9]*[1-9])0+$/, "$1") + magnitude.text
    );
  }
  return "";
}

export const MapSection = () => {
  const { mapCountries } = useSelector((state) => state.mapCountries);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.65);
  const zoomPanRef = useRef();
  const zoomRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const [state, setState] = useState({
    cName: "Select Country",
    iso: "",
    val: "",
    image: "",
    flag: "",
    text: "",
  });

  const [populationData, setPopulationData] = useState([]);
  useEffect(() => {
    const canvas = zoomPanRef.current;
    canvas.width = zoomRef.current.offsetWidth;
    canvas.height = zoomRef.current.offsetHeight;
    setCanvas(canvas);
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    const countryList = [];
    mapCountries.forEach((countryData) => {
      countryList.push({
        country: countryData?.country,
        value: 1,
      });
    });
    setPopulationData(countryList);
  }, [mapCountries]);

  const getStyle = ({ countryCode }) => ({
    fill: populationData.some((obj) => obj.country === countryCode)
      ? countryCode === selectedCountry
        ? "#FFD600"
        : "#244180"
      : "#D3D4D8",
    stroke: "white",
  });

  const handleZoomIn = () => {
    zoomPanRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    zoomPanRef.current.zoomOut();
  };
  const handleZoom = (scale, currentPosition) => {};

  const clickAction = ({ event, countryName, countryCode, countryValue }) => {
    setSelectedCountry(countryCode);
    const getItem = mapCountries.find(
      (e) => e.country?.toLowerCase() === countryCode?.toLowerCase()
    );
    if (getItem)
      setState({
        cName: countryName,
        iso: countryCode,
        val: formattedNumber(countryValue, 2),
        image: getItem.image,
        flag: "",
        text: getItem.text,
      });
  };
  const handleDivClick = (event) => {
    const xC = event.clientX;
    const yC = event.clientY;
    const innertY = window.innerHeight;
    const innertX = window.innerWidth;

    const x = innertX - xC < 240 ? innertX - 240 : xC - 45;
    const y = innertY - yC < 275 ? innertY - 275 : yC - 40;
    setTooltipPosition({ x, y });
  };
  useEffect(() => {
    const tooltipElement = document.getElementById("data-tooltip");
    const yourDiv = tooltipElement.querySelectorAll("svg")[0];

    if (yourDiv) {
      yourDiv.addEventListener("click", handleDivClick);
    }

    return () => {
      if (yourDiv) {
        yourDiv.removeEventListener("click", handleDivClick);
      }
    };
  }, [coords, tooltipPosition]);

  return (
    <div ref={zoomRef} 
    // style={{ height: "100vh" }}
    >
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        ref={zoomPanRef}
        onZoom={handleZoom}
        onTransformed={(e) => {
          setZoomPosition({ x: e.state.positionX, y: e.state.positionY });
          setScale(e.state.scale);
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="absolute z-10 flex flex-col tools md:justify-end top-2 md:bottom-2 right-2">
              <Button
                onClick={handleZoomIn}
                className="px-3 py-2 border cursor-pointer rounded-tl-md rounded-tr-md text-neutral-500 w-fit bg-neutral-200 border-neutral-300"
                leftIcon={<ZoomInIcon />}
                variant={"none"}
              />
              <Button
                onClick={handleZoomOut}
                className="px-3 py-2 border cursor-pointer rounded-bl-md rounded-br-md text-neutral-500 w-fit bg-neutral-200 border-neutral-300"
                leftIcon={<ZoomOutIcon />}
                variant={"none"}
              />
            </div>
            <div id="data-tooltip">
              <TransformComponent>
                <WorldMap
                  color="#244180"
                  value-suffix="people"
                  size="xxl"
                  data={populationData}
                  onClickFunction={clickAction}
                  styleFunction={getStyle}
                />
              </TransformComponent>
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>

      {state?.val && (
        <div
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 9999,
          }}
          // className="bottom-0 left-0 z-auto flex flex-col items-center w-full px-4 pb-4 bg-white md:pb-0 md:px-0 md:absolute md:w-fit"
          className=" md:pb-0 md:px-0 md:absolute md:w-fit"
        >
          <div className="flex flex-col w-full gap-3 p-4 rounded-lg shadow-sm md:w-60">
            <div className="hidden w-full overflow-hidden md:block h-36 rounded-xl">
              <img
                src={state?.image || "./images/banner/banner.jpg"}
                className="object-cover w-full h-full"
                alt="country"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <img
                src={`${process.env.REACT_APP_COUNTRY_URL}${state?.iso}.svg`}
                className="object-contain w-4 h-auto"
                alt="US flag"
              />
              <p className="text-sm font-bold sm:text-md sm:font-500 text-neutral-1000">
                {state.cName}
              </p>
            </div>
            <p className="font-medium text-center text-button-sm text-neutral-600">
              {state.text}
            </p>
          </div>
          <div className="hidden md:flex triangle"></div>
        </div>
      )}
    </div>
  );
};
