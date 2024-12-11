import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>{error.statusText}</h1>
      <Link to="/">Back home</Link>
    </div>
  );
};
export default Error;
