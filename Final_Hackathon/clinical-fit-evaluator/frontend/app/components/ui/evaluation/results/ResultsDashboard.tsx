import { EvaluationResult } from "@/app/lib/types";
import { motion } from "framer-motion";
import { ScoreCard } from "./ScoreCard";
import { TraitAlignmentCard } from "./TraitAlignmentCard";
import { ConflictRiskCard } from "./ConflictRiskCard";

interface ResultsDashboardProps {
  result: EvaluationResult;
}

export const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  return (
    <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <ScoreCard score={result.clinical_fit_index} summary={result.fit_summary} />
      <TraitAlignmentCard matches={result.trait_matches} />
      <ConflictRiskCard risks={result.conflict_risks} />
    </motion.div>
  );
};