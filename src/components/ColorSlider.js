import React from "react";

const ColorSlider = ({ bmiCategory }) => {
  const bmiCategoryValues = {
    underweight: 0,
    normal: 25,
    overweight: 50,
    obesityClass1: 75,
    obesityClass2: 90,
    obesityClass3: 100,
  };
  const sliderValue = bmiCategory ? bmiCategoryValues[bmiCategory] : 0;
  console.log(bmiCategory, bmiCategoryValues[bmiCategory]);
  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        readOnly
        style={{
          background: `linear-gradient(
          to right,
          #00ccff 0%,
          #00ccff 25%,
          #66ff66 25%,
          #66ff66 50%,
          #ffcc00 50%,
          #ffcc00 75%,
          #ff6666 75%,
          #ff6666 100%
        )`,
          height: "10px",
          outline: "none",
          width: "100%",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default ColorSlider;
