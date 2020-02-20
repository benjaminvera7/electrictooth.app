import { useMemo, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import queryString from 'query-string';

// Hook
export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(
    () => () => {
      // <-- Now we return the useEffect teardown effect, which will be fired only after the path/search change for the first time
      try {
        // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0);
      }
    },
    [location.pathname],
  );

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
