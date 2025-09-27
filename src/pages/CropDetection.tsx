import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Loader2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-crop-detection.jpg';

export const CropDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  // Mock AI analysis function (replace with actual AI integration)
  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results - replace with actual AI analysis
    const mockResults = [
      {
        isHealthy: true,
        confidence: 0.95,
        recommendations: []
      },
      {
        isHealthy: false,
        diseaseType: 'Leaf Blight',
        confidence: 0.87,
        recommendations: [
          'Apply copper-based fungicide immediately',
          'Remove and dispose of affected leaves',
          'Improve air circulation around plants',
          'Reduce watering frequency and water at soil level'
        ]
      },
      {
        isHealthy: false,
        diseaseType: 'Rust Disease',
        confidence: 0.82,
        recommendations: [
          'Apply sulfur-based fungicide spray',
          'Ensure proper plant spacing for air flow',
          'Remove plant debris from around the base',
          'Consider using resistant varieties in the future'
        ]
      }
    ];
    
    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      analyzeImage(selectedImage);
    }
  };

  const handleSaveToHistory = () => {
    if (!analysisResult || !selectedImage) return;
    
    const historyItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      isHealthy: analysisResult.isHealthy,
      diseaseType: analysisResult.diseaseType,
      confidence: analysisResult.confidence,
      imageName: selectedImage.name
    };
    
    const existingHistory = JSON.parse(localStorage.getItem('cropcare-history') || '[]');
    const updatedHistory = [historyItem, ...existingHistory];
    localStorage.setItem('cropcare-history', JSON.stringify(updatedHistory));
    
    toast({
      title: "Saved to History",
      description: "Analysis result has been saved to your history.",
    });
  };

  const handleNewScan = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-success/80" />
        </div>
        <div className="relative p-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-2">CropCare AI Scanner</h1>
          <p className="text-lg opacity-90">
            Advanced AI-powered crop disease detection for healthier harvests
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="space-y-6">
        <ImageUpload
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          onClearImage={handleClearImage}
        />
        
        {selectedImage && !analysisResult && !isAnalyzing && (
          <div className="text-center">
            <Button 
              onClick={handleAnalyze}
              size="lg"
              className="min-w-48"
            >
              <Zap className="h-5 w-5 mr-2" />
              Analyze Leaf Health
            </Button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Analyzing Image...</h3>
          <p className="text-muted-foreground">
            Our AI is examining your crop leaf for signs of disease
          </p>
        </Card>
      )}

      {/* Results Section */}
      {analysisResult && !isAnalyzing && (
        <AnalysisResults
          isHealthy={analysisResult.isHealthy}
          diseaseType={analysisResult.diseaseType}
          confidence={analysisResult.confidence}
          recommendations={analysisResult.recommendations}
          onSaveToHistory={handleSaveToHistory}
          onNewScan={handleNewScan}
        />
      )}

      {/* Quick Tips */}
      {!selectedImage && !isAnalyzing && (
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">Tips for Best Results</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Use clear, well-lit photos
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Focus on the affected leaf area
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Avoid blurry or shadowed images
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Include the entire leaf when possible
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Take photos in natural lighting
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                Clean the camera lens for clarity
              </li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};