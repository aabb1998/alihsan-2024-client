import { Link } from "react-router-dom";
import { Campaigns } from "./Campaigns";

export default function ModalItems({ selectedItem, handleClick }) {
  const AboutUS = ({ item ,handleClick}) => {
    return (
      <div className="w-3/12 grow">
        <Link to={item.to} onClick={handleClick}>
          <div className="mb-4 overflow-hidden rounded-md">
            <img
              src={item.image}
              className="object-cover w-full h-full transition duration-500 hover:scale-110"
              alt={item.title}
            />
          </div>
          <h6 className="heading-7 mb-1.5">{item.title}</h6>
          <p className="text-sm tracking-tight text-neutral-600 line-clamp-3">
            {item.description}{" "}
          </p>
        </Link>
      </div>
    );
  };

  const Description = ({ item }) => {
    return (
      <div className="w-4/12">
        <Link to={item.to}>
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={item.image}
              className="object-cover w-full h-full transition duration-500 hover:scale-110"
              alt={item.title}
            />
          </div>
          <h6 className="heading-7 mb-1.5">{item.title}</h6>
          <p className="text-sm tracking-tight text-neutral-600 line-clamp-3">
            {item.description}{" "}
          </p>
        </Link>{" "}
      </div>
    );
  };

  return (
    <div className="container relative !p-0 flex gap-7.5 grow">
      {selectedItem?.menu === "campaigns" ? (
        <Campaigns handleClick={handleClick} />
      ) : !!selectedItem?.subMenu?.length ? (
        <>
          {selectedItem?.subMenu?.map((item) => (
            <AboutUS item={item} handleClick={handleClick}/>
          ))}
        </>
      ) : (
        <Description item={selectedItem} />
      )}
    </div>
  );
}
