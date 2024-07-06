import React, { useEffect, useState } from "react";
import "../styles/veri.css"; // Import the CSS file

const VerificationPage = () => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    document.getElementById("input-0").focus();
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const updatedInputs = [...inputs];

    if (value.length <= 1) {
      updatedInputs[index] = value;
      setInputs(updatedInputs);

      // Move to the next input if value is not empty
      if (value && index < inputs.length - 1) {
        document.getElementById(`input-${index + 1}`).removeAttribute("disabled");
        document.getElementById(`input-${index + 1}`).focus();
      }

      // Enable the button if all inputs are filled
      if (updatedInputs.every(input => input !== "")) {
        setIsButtonActive(true);
      } else {
        setIsButtonActive(false);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      const updatedInputs = [...inputs];
      updatedInputs[index] = "";
      setInputs(updatedInputs);

      document.getElementById(`input-${index}`).setAttribute("disabled", true);
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Submitted: ${inputs.join("")}`);
  };

  return (
    <div className="container">
      <header>
        <i className="bx bxs-check-shield"></i>
      </header>
      <h4>Enter OTP Code</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="number"
              id={`input-${index}`}
              value={input}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={index !== 0}
            />
          ))}
        </div>
        <button type="submit" className={isButtonActive ? "active" : ""} disabled={!isButtonActive}>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerificationPage;
