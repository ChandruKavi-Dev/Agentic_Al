import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConflictRisk } from "@/app/lib/types";
import { AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";

const getRiskDetails = (level: string) => {
  switch (level.toLowerCase()) {
    case 'red': return { icon: <AlertTriangle className="h-5 w-5 text-red-600" />, style: "bg-red-50 border-red-500" };
    case 'yellow': return { icon: <ShieldAlert className="h-5 w-5 text-yellow-600" />, style: "bg-yellow-50 border-yellow-500" };
    default: return { icon: <ShieldCheck className="h-5 w-5 text-green-600" />, style: "bg-green-50 border-green-500" };
  }
};

export const ConflictRiskCard = ({ risks }: { risks: ConflictRisk[] }) => (
    <Card>
        <CardHeader><CardTitle>Potential Conflict Risks</CardTitle></CardHeader>
        <CardContent className="space-y-3">
            {risks.map((risk, index) => {
                const { icon, style } = getRiskDetails(risk.risk_level);
                return (
                    <div key={index} className={`p-4 rounded-md border-l-4 flex items-start space-x-4 ${style}`}>
                        <div className="flex-shrink-0">{icon}</div>
                        <div>
                            <p className="font-bold text-gray-800">{risk.area} ({risk.risk_level})</p>
                            <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                    </div>
                );
            })}
        </CardContent>
    </Card>
);