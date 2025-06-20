/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { evaluateCandidateFit } from '@/app/lib/api';
import { EvaluationResult } from '@/app/lib/types';
import { toast } from "sonner";

export const useEvaluation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performEvaluation = async (formData: FormData) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
   

    try {
      const data = await evaluateCandidateFit(formData);
      setResult(data);
      toast.success("Evaluation Complete!", {
        description: "The analysis results are now available.",
      });
    } catch (err: any) {
      setError(err.message);
      toast.error("Evaluation Failed", {
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, result, error, performEvaluation };
};