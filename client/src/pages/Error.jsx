// React imports
import { useRouteError } from 'react-router-dom';


export default function Error() {
  const error = useRouteError();
  console.log('Caught an error:', error);

  return (
    <main id='errorPage'>
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || "Unknown Error"}</i>
      </p>
      <button onClick={() => window.history.back()} className='btn'>
        Go Back
      </button>
    </main>
  )
}
