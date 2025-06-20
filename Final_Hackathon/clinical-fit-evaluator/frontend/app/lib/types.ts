export interface TraitMatch {
  trait: string;
  alignment_score: number;
  justification: string;
}

export interface ConflictRisk {
  risk_level: string;
  area: string;
  description: string;
}

export interface EvaluationResult {
  clinical_fit_index: number;
  fit_summary: string;
  trait_matches: TraitMatch[];
  conflict_risks: ConflictRisk[];
}