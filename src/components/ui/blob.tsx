import classNames from "classnames";

interface BlobInterface {
  loading?: boolean;
  success?: boolean;
}

const Blob: React.FC<BlobInterface> = ({ loading, success }) => {
  return (
    <div
      className={classNames(
        `blob  h-96 w-96 ml-10 flex flex-col justify-center items-center duration-700`,
        success ? "bg-green-500 shadow-2xl blob-animation" : 
        loading ? "bg-orange-400 blob-animation" : "bg-[#bcc4dd]"
      )}
    >
      <h1
        className={classNames(
          "text-[#ba6969] text-5xl font-extrabold",
          (success || loading) && "text-gray-50"
        )}
      >
        Harbourbit.
      </h1>
      <p
        className={classNames(
          "mt-5 text-sm text-[#ba6969]",
          (success || loading) && "text-gray-50"
        )}
      >
        be the best version of yourself
      </p>
    </div>
  );
};

export default Blob;
