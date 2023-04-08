import "./App.css";
import React, { useState, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, InputNumber, Radio, Button } from "antd";
import ColorSlider from "./components/ColorSlider";

function App() {
  const [bmiValue, setBmiValue] = useState({
    gender: "male",
    unit: "metric",
    name: "",
    age: null,
    height: null,
    weight: null,
  });
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
  const [bmiDisplay, setBmiDisplay] = useState(false);

  const detailRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBmiValue({
      ...bmiValue,
      [name]: value,
    });
  };

  const calculateBMI = () => {
    setBmiDisplay(true);

    let calculatedBmi;

    if (bmiValue.unit === "metric") {
      calculatedBmi = bmiValue.weight / Math.pow(bmiValue.height / 100, 2);
    } else {
      calculatedBmi = (bmiValue.weight / Math.pow(bmiValue.height, 2)) * 703;
    }

    setBmi(calculatedBmi.toFixed(1));
    setBmiCategory(getBmiCategory(calculatedBmi));
    detailRef?.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight";
    } else if (bmi >= 30 && bmi <= 34.9) {
      return "Obesity Class I";
    } else if (bmi >= 35 && bmi <= 39.9) {
      return "Obesity Class II";
    } else {
      return "Obesity Class III";
    }
  };

  console.log(bmiValue);

  return (
    <div>
      <section className="peakmetric_background">
        <div className="peakmetric_glass">
          <article className="dashboard">
            <div className="user">
              <Avatar
                size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
              />
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="details">
                <div className="peakmetric_unit">
                  <p className="gender">Units</p>
                  <Radio.Group
                    onChange={onChange}
                    defaultValue={bmiValue.unit}
                    buttonStyle="solid"
                    name="unit"
                  >
                    <Radio.Button value="metric">Metric (cm, kg)</Radio.Button>
                    <Radio.Button value="imperial">
                      Imperial (in, lbs)
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div>
                  <p className="gender">Gender</p>
                  <Radio.Group
                    onChange={onChange}
                    defaultValue={bmiValue.gender}
                    name="gender"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="female">Female</Radio.Button>
                  </Radio.Group>
                </div>
                <Input
                  name="name"
                  placeholder="Enter your Name"
                  value={bmiValue.name}
                  onChange={onChange}
                />
                <InputNumber
                  min={1}
                  max={120}
                  defaultValue={bmiValue.age}
                  addonAfter="years"
                  placeholder="How old are you?"
                  // onChange={onChange}
                />
                <Input
                  min={1}
                  max={120}
                  defaultValue={bmiValue.height}
                  addonAfter={bmiValue.unit === "metric" ? "cm" : "in"}
                  placeholder="Height*"
                  name="height"
                  onChange={onChange}
                />
                <Input
                  min={1}
                  max={120}
                  defaultValue={bmiValue.weight}
                  addonAfter={bmiValue.unit === "metric" ? "kg" : "lbs"}
                  placeholder="Weight*"
                  name="weight"
                  onChange={onChange}
                />

                {/* <InputNumber
                name="age"
                placeholder="How old are you?"
                value={bmiValue.age}
                onChange={onChange}
              /> */}

                <Button type="primary" onClick={calculateBMI}>
                  Calculate
                </Button>
              </div>
            </form>
          </article>
          <article className="peakmetric_main"></article>
        </div>
      </section>
      <section className="circle1"></section>
      <section className="circle2"></section>

      {bmiDisplay && (
        <section ref={detailRef} className="peakmetric_mobile_details">
          <ColorSlider bmiCategory={bmiCategory} />
          {bmi} {bmiCategory}
        </section>
      )}
    </div>
  );
}

export default App;
