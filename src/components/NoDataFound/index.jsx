import Img from "../Image";

export const NoDataFound = ({ title, desctiption }) => {
  return (
    <div className="">
    <div className="flex flex-col items-center justify-center gap-0 p-10 rounded-xl">
      <div className="w-[11.5rem] h-48">
        <Img src={"/images/illustration/empty.svg"} className={'w-full h-full'} alt="No Data Found" />
      </div>
      <div className="max-w-[19rem] text-sm text-center text-neutral-600">
        <h2 className="mb-2 heading-6 text-neutral-1000">{title}</h2>
        <p>{desctiption}</p>
      </div>
    </div>
    </div>

  );
};
