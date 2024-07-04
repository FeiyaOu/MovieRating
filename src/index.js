import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StartRating.js";
import { useState } from "react";
// import Expender from "./Expander.js";
// import "./Expander.css";
import "./index.css";
import App from "./App-version2.js";
//
// import Conversion from "./Conversion.js";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" onSetMovieRating={setMovieRating} />
//       <p>This movie has {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Conversion /> */}
    <App />
    {/* <StarRating message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <StarRating color="red" size={36} className="test" defaultRating={3} />
    <Test />
    <Expender /> */}
  </React.StrictMode>
);
