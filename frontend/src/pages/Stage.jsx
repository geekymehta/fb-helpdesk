// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const Stage = () => {
//   const location = useLocation();

//   // Parse the query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const method = queryParams.get("method");

//   // Parse the fragment identifier
//   const fragmentParams = new URLSearchParams(location.hash.substring(1));
//   const accessToken = fragmentParams.get("access_token");
//   const dataAccessExpirationTime = fragmentParams.get(
//     "data_access_expiration_time"
//   );
//   const expiresIn = fragmentParams.get("expires_in");
//   const longLivedToken = fragmentParams.get("long_lived_token");

//   const data = {
//     method,
//     accessToken,
//     dataAccessExpirationTime,
//     expiresIn,
//     longLivedToken,
//   };

//   useEffect(() => {
//     window.opener.postMessage(data, "*");
//     window.close();
//   }, [data]);

//   return <div>Stage</div>;
// };

// export default Stage;
