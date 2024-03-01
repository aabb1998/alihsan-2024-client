import React, { useState, useEffect } from "react";
import Loader from "../Loader";
export default function Img1 ({ src, className, alt }) {
    const [state, setState] = useState({loading: false, src: ''})
    useEffect(() => {
        if(!src) return;
        setState({loading: true, src: ''})
        const img = new Image();
        img.onload = () => {
            setState({loading: false, src})
        }
        img.src = src;
    }, [src])
    return (
        <>
            {src && state.src || !src ?
                <img
                    src={state.src || "/images/banner/placeholder.jpg"}
                    style={{
                      objectPosition: "middle center",
                    }}
                    alt={alt}
                    className={className}
                    loading="lazy"
                />
            : !state.src && (
                <div
                  className={`w-full h-full bg-neutral-200 rounded-xl  ${className}`}
                >
                  <Loader />
                </div>
            )}
        </>
    )
}
