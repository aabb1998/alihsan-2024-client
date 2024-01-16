import React, { useEffect } from "react";
import { MediaListing } from "./MediaListing";
import PageHead from "../../components/PageHead";

const Media = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className=" py-7.5 sm:py-10">
      <PageHead title={'Media'}/>
      <MediaListing/>
    </div>
  );
};

export default React.memo(Media);
