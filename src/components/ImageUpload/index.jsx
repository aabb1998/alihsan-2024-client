import { PlusIcon, TrashIcon } from "../../theme/svg-icons";
import PropTypes from "prop-types";

const ImageUpload = ({
  imagePreviews,
  name,
  handleImageDelete,
  handleImageChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-1 gap-2 border border-dashed rounded-lg border-neutral-500 grow lg:flex-grow-0">
      <label
        htmlFor={name}
        className="relative cursor-pointer !flex flex-col items-center grow justify-center gap-2 w-51 h-36 overflow-hidden"
      >
        {imagePreviews ? (
          <>
            <div
              className="absolute z-10 p-2 text-white bg-red-300 rounded-lg"
              onClick={(event) => handleImageDelete(event)}
            >
              <TrashIcon iconSize={"16"} />
            </div>
            <img
              src={imagePreviews}
              alt={`Uploaded`}
              className="object-cover w-full h-full rounded-lg "
            />
          </>
        ) : (
          <>
            <PlusIcon strokeWidth={1.5} />
            <span className="text-neutral-600 text-button-md">Add Photo</span>
          </>
        )}

        <input
          className="absolute invisible w-full h-full"
          id={name}
          type="file"
          name={name}
          accept="image/*"
          onChange={(event) => handleImageChange(event)}
        />
      </label>
    </div>
  );
};

ImageUpload.propTypes = {
  imagePreviews: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleImageDelete: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};
export default ImageUpload;
