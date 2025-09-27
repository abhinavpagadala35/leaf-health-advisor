import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Calendar, Trash2, Download } from 'lucide-react';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  isHealthy: boolean;
  diseaseType?: string;
  confidence: number;
  imageName: string;
}

export const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('cropcare-history');
    if (savedHistory) {
      setHistoryItems(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    setHistoryItems([]);
    localStorage.removeItem('cropcare-history');
  };

  const deleteItem = (id: string) => {
    const updatedHistory = historyItems.filter(item => item.id !== id);
    setHistoryItems(updatedHistory);
    localStorage.setItem('cropcare-history', JSON.stringify(updatedHistory));
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(historyItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cropcare-history.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (historyItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground">
            Your crop analysis history will appear here
          </p>
        </div>
        
        <Card className="p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Analysis History</h2>
          <p className="text-muted-foreground">
            Start analyzing crop leaves to build your history
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground">
            {historyItems.length} analysis{historyItems.length !== 1 ? 'es' : ''} performed
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportHistory}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="destructive" onClick={clearHistory}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {historyItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.isHealthy ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                  {item.isHealthy ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">
                      {item.isHealthy ? 'Healthy Leaf' : item.diseaseType || 'Disease Detected'}
                    </h3>
                    {!item.isHealthy && (
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(item.confidence * 100)}% confidence
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </span>
                    <span>{item.time}</span>
                    <span>{item.imageName}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteItem(item.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};