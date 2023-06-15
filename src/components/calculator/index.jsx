import React, { useState } from "react";
import Form0 from "./Step0";
import Form1 from "./Step1";
// import Form2 from "./Step2";
// import Form3 from "./Step3";
// import Form4 from "./Step4";
import StepTypeOfEntitie from "./Step01";

export default function StepForms() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      {step === 1 && <Form0 onNextStep={handleNextStep} />}
      {/* {step === 2 && (
        <Form1
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )} */}
      {/* {step === 3 && (
        <Form2
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && (
        <Form3
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 5 && (
        <Form4
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )} */}
      {step === 2 && (
        <StepTypeOfEntitie
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
    </>
  );
}
