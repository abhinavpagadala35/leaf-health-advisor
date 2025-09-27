import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Droplets, Bug, Sun, Wind } from 'lucide-react';

export const CommonDiseases = () => {
  const diseases = [
    {
      name: "Leaf Blight",
      icon: AlertTriangle,
      severity: "High",
      causes: ["High humidity", "Poor air circulation", "Infected seeds"],
      symptoms: ["Brown spots on leaves", "Yellowing of leaf edges", "Wilting"],
      prevention: ["Use resistant varieties", "Ensure proper spacing", "Avoid overhead watering"],
      treatment: ["Apply copper-based fungicide", "Remove affected leaves", "Improve drainage"]
    },
    {
      name: "Rust Disease",
      icon: Droplets,
      severity: "Medium",
      causes: ["Moisture on leaves", "Cool, humid weather", "Wind spread spores"],
      symptoms: ["Orange-red pustules", "Yellow spots", "Leaf drop"],
      prevention: ["Plant in well-ventilated areas", "Water at soil level", "Remove plant debris"],
      treatment: ["Apply sulfur spray", "Use systemic fungicides", "Prune affected areas"]
    },
    {
      name: "Aphid Infestation",
      icon: Bug,
      severity: "Medium",
      causes: ["Warm weather", "Over-fertilization", "Weak plants"],
      symptoms: ["Curled leaves", "Sticky honeydew", "Stunted growth"],
      prevention: ["Encourage beneficial insects", "Avoid over-fertilizing", "Regular inspection"],
      treatment: ["Use insecticidal soap", "Apply neem oil", "Introduce ladybugs"]
    },
    {
      name: "Heat Stress",
      icon: Sun,
      severity: "Low",
      causes: ["High temperatures", "Insufficient water", "Direct sunlight"],
      symptoms: ["Wilting during day", "Leaf scorching", "Reduced growth"],
      prevention: ["Provide shade", "Mulch around plants", "Regular watering"],
      treatment: ["Increase watering frequency", "Install shade cloth", "Apply cooling sprays"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Common Crop Diseases</h1>
        <p className="text-muted-foreground">
          Learn about the most common diseases affecting crops and how to prevent and treat them
        </p>
      </div>

      <div className="grid gap-6">
        {diseases.map((disease, index) => {
          const Icon = disease.icon;
          return (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{disease.name}</h2>
                  </div>
                  <Badge variant={getSeverityColor(disease.severity) as any}>
                    {disease.severity} Risk
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      Causes
                    </h3>
                    <ul className="space-y-1">
                      {disease.causes.map((cause, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 mr-2 flex-shrink-0" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      Symptoms
                    </h3>
                    <ul className="space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 mr-2 flex-shrink-0" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-success uppercase tracking-wide">
                      Prevention
                    </h3>
                    <ul className="space-y-1">
                      {disease.prevention.map((prevention, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="w-1 h-1 rounded-full bg-success mt-2 mr-2 flex-shrink-0" />
                          {prevention}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-warning uppercase tracking-wide">
                      Treatment
                    </h3>
                    <ul className="space-y-1">
                      {disease.treatment.map((treatment, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="w-1 h-1 rounded-full bg-warning mt-2 mr-2 flex-shrink-0" />
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <Wind className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold">General Prevention Tips</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Regular monitoring and early detection
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Proper crop rotation practices
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Maintain soil health and pH balance
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Use disease-resistant crop varieties
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Implement integrated pest management
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
              Keep farming tools clean and sanitized
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};