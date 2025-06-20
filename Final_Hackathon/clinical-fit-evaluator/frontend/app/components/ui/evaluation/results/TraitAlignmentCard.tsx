import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TraitMatch } from "@/app/lib/types";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export const TraitAlignmentCard = ({ matches }: { matches: TraitMatch[] }) => (
    <Card>
        <CardHeader><CardTitle>Trait Alignment Analysis</CardTitle></CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {matches.map((match, i) => (
                    <motion.li key={match.trait} custom={i} initial="hidden" animate="visible" variants={variants}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700">{match.trait}</span>
                            <span className="font-bold text-blue-600">{match.alignment_score}%</span>
                        </div>
                        <Progress value={match.alignment_score} className="h-2" />
                        <p className="text-sm text-gray-500 mt-1">{match.justification}</p>
                    </motion.li>
                ))}
            </ul>
        </CardContent>
    </Card>
);