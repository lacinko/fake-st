import { useRouteError } from "react-router-dom";
import { errorMessage } from "../utils/utils";

function ErrorPage(): JSX.Element {
  const error = errorMessage(useRouteError());
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
