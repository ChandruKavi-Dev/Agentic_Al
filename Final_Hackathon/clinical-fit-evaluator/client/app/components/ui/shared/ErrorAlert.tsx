import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ErrorAlert = ({ message }: { message: string | null }) => {
    if (!message) return null;
    return (
        <Card className="bg-red-50 border-red-500 border-l-4 animate-fade-in">
            <CardContent className="p-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-4" />
                <div>
                    <h4 className="font-bold text-red-800">An Error Occurred</h4>
                    <p className="text-red-700">{message}</p>
                </div>
            </CardContent>
        </Card>
    );
};