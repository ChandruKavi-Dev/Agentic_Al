'use client';

import { EvaluationForm } from "@/app/components/ui/evaluation/EvaluationForm";
import { ResultsDashboard } from "@/app/components/ui/evaluation/results/ResultsDashboard";
import { ErrorAlert } from "@/app/components/ui/shared/ErrorAlert";
import { LoadingSpinner } from "@/app/components/ui/shared/LoadingSpinner";
import { useEvaluation } from "@/app/hooks/useEvaluation";

export default function Home() {
  const { isLoading, result, error, performEvaluation } = useEvaluation();

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Clinical Fit <span className="text-blue-600">Evaluator</span>
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Leveraging Agentic AI to find the perfect match for your hospital&apos;s culture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column: Form */}
        <div>
          <EvaluationForm isLoading={isLoading} onSubmit={performEvaluation} />
        </div>

        {/* Right Column: Results */}
        <div className="md:mt-0">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorAlert message={error} />}
          {result && <ResultsDashboard result={result} />}
        </div>
      </div>
    </main>
  );
}