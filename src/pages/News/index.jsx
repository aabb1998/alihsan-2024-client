import React, { useEffect } from "react";
import { NewsList } from "../../features/news/NewsList";
import PageHead from "../../components/PageHead";

const NewsComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <PageHead title={"News"} />
      <div className="py-7.5 md:py-15">
        <NewsList />
      </div>
    </div>
  );
};

export default React.memo(NewsComponent);
