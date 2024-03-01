export function ErrorLabel({ touched, error, className = "" }) {
    return (
      <div className={"mt-2 text-red-300 text-sm " + className}>
        {touched ? error : ""}
      </div>
    );
  }