import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Leaf, FileText } from 'lucide-react';

interface AnalysisResultsProps {
  isHealthy: boolean;
  diseaseType?: string;
  confidence: number;
  recommendations: string[];
  onSaveToHistory: () => void;
  onNewScan: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  isHealthy,
  diseaseType,
  confidence,
  recommendations,
  onSaveToHistory,
  onNewScan
}) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
          isHealthy ? 'bg-success/10' : 'bg-warning/10'
        }`}>
          {isHealthy ? (
            <CheckCircle className="h-8 w-8 text-success" />
          ) : (
            <AlertTriangle className="h-8 w-8 text-warning" />
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {isHealthy ? 'Healthy Leaf' : 'Disease Detected'}
          </h2>
          {!isHealthy && diseaseType && (
            <div className="space-y-2">
              <Badge variant="destructive" className="text-sm">
                {diseaseType}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {!isHealthy && recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Treatment Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isHealthy && (
        <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Leaf className="h-5 w-5 text-success" />
            <span className="font-medium text-success">Excellent Health!</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your crop leaf appears to be healthy. Continue with regular care and monitoring.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button onClick={onSaveToHistory} variant="outline" className="flex-1">
          Save to History
        </Button>
        <Button onClick={onNewScan} className="flex-1">
          New Scan
        </Button>
      </div>
    </Card>
  );
};