import React, { useState, useEffect } from "react";
import { Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { CustomRadioButtonProps } from "../utils/TypesIndex";

export default function CustomRadioButton(props: CustomRadioButtonProps) {
  const { name, value, label, onChange } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (val: string) => {
    setSelectedValue(val);

    const event = {
      target: {
        name,
        value: val,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  useEffect(() => {
    setSelectedValue(value); // sync state if value prop changes externally
  }, [value]);

  return (
    <>
      <Row className="pb-0">
        <p className="mb-0">{label}</p>
      </Row>
      <Row className="mb-2">
        <ToggleButtonGroup type="radio" name={name} defaultValue={value} onChange={handleChange}>
          <ToggleButton id={`${name}-radio-passed`} value="passed" variant={selectedValue === "passed" ? "primary" : "outline-primary"}>
            Passed
          </ToggleButton>
          <ToggleButton id={`${name}-radio-failed`} value="failed" variant={selectedValue === "failed" ? "danger  text-white" : "outline-danger"}>
            Failed
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
    </>
  );
}
