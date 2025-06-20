import { EvaluationResult } from "./types";

export const evaluateCandidateFit = async (formData: FormData): Promise<EvaluationResult> => {
  const response = await fetch('http://localhost:8000/evaluate', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'An API error occurred.');
  }

  return response.json();
};