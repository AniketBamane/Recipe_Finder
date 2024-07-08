import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/veri.css"; // Import the CSS file
import toast from "react-hot-toast";

const VerificationPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [loading,setLoading] = useState(false)
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const state = location.state || {} ;

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

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)
    const inputedCode = inputs.join("")
    const verificationCode = state.verificationCode
    console.log(typeof(verificationCode),typeof(inputedCode))
    if(verificationCode == inputedCode) {
      const response = await fetch("http://localhost:3000/api/auth/signup",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: state.email,password:state.password,username:state.username})
      })
      const data = await response.json()
      if(response.ok) {
        toast.success('Account created successfully', {
          duration: 2000,
          style: {
            background: 'green',
            color: 'white',
          },
          icon: '🥳',
        });
        setLoading(false)
        navigate("/")
      }else{
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
        setLoading(false)
      }
    }
    else {
      toast.error("invalid OTP code !", {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
      setLoading(false)
    }
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
          {loading ? "verifying code ....":"Verify code"}
        </button>
      </form>
    </div>
  );
};

export default VerificationPage;
