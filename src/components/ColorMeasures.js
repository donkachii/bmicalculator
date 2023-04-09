import React from "react";

const ColorMeasures = () => {
  return (
    <article>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#81C784",
          }}
        ></div>{" "}
        <p> => 0 - 18.4. Underweight</p>
      </div>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#4CAF50",
          }}
        ></div>{" "}
        <p> => 18.5 - 24.9. Normal</p>
      </div>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#FFA726",
          }}
        ></div>{" "}
        => 25 - 29.9. Overweight
      </div>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#FF7043",
          }}
        ></div>{" "}
        => 30 - 34.9. Obesity Class I (Moderate)
      </div>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#F44336",
          }}
        ></div>{" "}
        => 35 - 39.9. Obesity Class II (Severe)
      </div>
      <div className="peakmetric_desktop_grid">
        <div
          className="peakmetric_desktop_measures"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#B71C1C",
          }}
        ></div>{" "}
        <p>
          => Greater than 40. Obesity Class III (Very severe or morbidly obese)
        </p>
      </div>
    </article>
  );
};

export default ColorMeasures;
