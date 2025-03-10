import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

// Form Provider 
export const MultiFormProvider = ({ children, steps, formComponents }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const next = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const back = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const contextValue = {
    steps,
    currentStep,
    formData,
    next,
    back,
    updateFormData,
    formComponents
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook for simplifing
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a MultiFormProvider');
  }
  return context;
};