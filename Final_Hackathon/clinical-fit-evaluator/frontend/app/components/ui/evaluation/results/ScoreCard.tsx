import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ScoreCardProps {
    score: number;
    summary: string;
}

export const ScoreCard = ({ score, summary }: ScoreCardProps) => (
    <Card className="text-center bg-blue-50 border-blue-200">
        <CardHeader>
            <CardTitle className="text-xl">Overall Clinical Fit Index</CardTitle>
        </CardHeader>
        <CardContent>
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <p className="text-7xl font-bold text-blue-600">{score}<span className="text-3xl text-gray-400">/100</span></p>
            </motion.div>
            <p className="mt-4 text-gray-600">{summary}</p>
        </CardContent>
    </Card>
);