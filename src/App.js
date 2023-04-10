import "./App.css";
import React, { useState, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, InputNumber, Radio, Button, Form } from "antd";
import ReactSpeedometer from "react-d3-speedometer";
import ColorMeasures from "./components/ColorMeasures";

function App() {
  const [selectedUnit, setSelectedUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
  const [bmiDisplay, setBmiDisplay] = useState(false);

  const detailRef = useRef(null);

  const [form] = Form.useForm();

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const calculateBMI = (values) => {
    const { height, heightFt, heightIn, weight, unit } = values;
    console.log(values);

    setBmiDisplay(true);

    let calculatedBmi;

    if (unit === "metric") {
      calculatedBmi = weight / Math.pow(height / 100, 2);
    } else {
      // const weightInKg = weight / 2.20462;
      const totalHeightInInches = heightFt * 12 + heightIn;
      calculatedBmi = (weight / Math.pow(totalHeightInInches, 2)) * 703;
    }

    setBmi(calculatedBmi.toFixed(1));
    setBmiCategory(getBmiCategory(calculatedBmi));
    detailRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "overweight";
    } else if (bmi >= 30 && bmi <= 34.9) {
      return "obesityClass1";
    } else if (bmi >= 35 && bmi <= 39.9) {
      return "obesityClass2";
    } else {
      return "obesityClass3";
    }
  };

  return (
    <div>
      <section className="peakmetric_background">
        <div className="peakmetric_glass">
          <article className="dashboard">
            <div className="user">
              <Avatar
                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
              />
            </div>

            <Form
              form={form}
              layout="vertical"
              style={{
                width: "100%",
              }}
              onFinish={calculateBMI}
              initialValues={{
                gender: "male",
                unit: "metric",
                age: "",
                height: "",
                heightFt: "",
                heightIn: "",
                weight: "",
              }}
            >
              <div className="details">
                <div className="peakmetric_unit">
                  <Form.Item name="unit">
                    <Radio.Group
                      defaultValue="metric"
                      onChange={handleUnitChange}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="metric">
                        Metric (cm, kg)
                      </Radio.Button>
                      <Radio.Button value="imperial">
                        Imperial (in, lbs)
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <Form.Item name="gender">
                  <Radio.Group defaultValue="male" buttonStyle="solid">
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="female">Female</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[
                    { required: true, message: "Please input your age!" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={120}
                    addonAfter="years"
                    placeholder="How old are you?"
                  />
                </Form.Item>

                {selectedUnit === "metric" ? (
                  <Form.Item
                    name="height"
                    rules={[
                      { required: true, message: "Please input your height!" },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      addonAfter="cm"
                      placeholder="Height*"
                    />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item
                      name="heightFt"
                      rules={[
                        {
                          required: true,
                          message: "Please input your height in feets!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        addonAfter="ft"
                        placeholder="Height (ft)*"
                      />
                    </Form.Item>

                    <Form.Item
                      name="heightIn"
                      rules={[
                        {
                          required: true,
                          message: "Please input your height in inches!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={11}
                        addonAfter="in"
                        placeholder="Height (in)*"
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item
                  name="weight"
                  rules={[
                    { required: true, message: "Please input your weight!" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    addonAfter={selectedUnit === "metric" ? "kg" : "lbs"}
                    placeholder="Weight*"
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Calculate
                </Button>
              </div>
            </Form>
          </article>
          <article className="peakmetric_main">
            <section className="peakmetric_desktop_details">
              <article className="peakmetric_desktop_units">
                <Form>
                  <Form.Item name="unit">
                    <Radio.Group
                      defaultValue="metric"
                      onChange={handleUnitChange}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="metric">
                        Metric (cm, kg)
                      </Radio.Button>
                      <Radio.Button value="imperial">
                        Imperial (in, lbs)
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </article>
              {bmiDisplay && (
                <>
                  <ReactSpeedometer
                    width={500}
                    needleHeightRatio={0.7}
                    maxValue={50}
                    value={parseFloat(bmi)}
                    segments={5}
                    ringWidth={47}
                    customSegmentStops={[0, 18.5, 24.9, 29.9, 34.9, 39.9, 50]}
                    segmentColors={[
                      "#81C784", // Underweight
                      "#4CAF50", // Normal
                      "#FFA726", // Overweight
                      "#FF7043", // Obese Class I
                      "#F44336", // Obese Class II
                      "#B71C1C", // Obese Class III
                    ]}
                    needleTransitionDuration={3333}
                    needleTransition="easeElastic"
                    currentValueText={`Your BMI is ${bmi} => ${
                      bmiCategory === "underweight"
                        ? "Underweight"
                        : bmiCategory === "normal"
                        ? "Normal"
                        : bmiCategory === "overweight"
                        ? "Overweight"
                        : bmiCategory === "obesityClass1"
                        ? "Obesity Class I (Moderate)"
                        : bmiCategory === "obesityClass2"
                        ? "Obesity Class II (Severe)"
                        : bmiCategory === "obesityClass3"
                        ? "Obesity Class III (Very severe or morbidly obese)"
                        : ""
                    }`}
                  />
                  <ColorMeasures />
                </>
              )}
            </section>
          </article>
        </div>
      </section>
      <section className="circle1"></section>
      <section className="circle2"></section>

      {bmiDisplay && (
        <section ref={detailRef} className="peakmetric_mobile_details">
          <ReactSpeedometer
            needleHeightRatio={0.7}
            maxValue={50}
            value={parseFloat(bmi)}
            segments={5}
            ringWidth={47}
            customSegmentStops={[0, 18.5, 24.9, 29.9, 34.9, 39.9, 50]}
            segmentColors={[
              "#81C784", // Underweight
              "#4CAF50", // Normal
              "#FFA726", // Overweight
              "#FF7043", // Obese Class I
              "#F44336", // Obese Class II
              "#B71C1C", // Obese Class III
            ]}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            currentValueText={`Your BMI is ${bmi} => ${
              bmiCategory === "underweight"
                ? "Underweight"
                : bmiCategory === "normal"
                ? "Normal"
                : bmiCategory === "overweight"
                ? "Overweight"
                : bmiCategory === "obesityClass1"
                ? "Obesity Class I (Moderate)"
                : bmiCategory === "obesityClass2"
                ? "Obesity Class II (Severe)"
                : bmiCategory === "obesityClass3"
                ? "Obesity Class III (Very severe or morbidly obese)"
                : ""
            }`}
          />
          <ColorMeasures />
        </section>
      )}
    </div>
  );
}

export default App;
