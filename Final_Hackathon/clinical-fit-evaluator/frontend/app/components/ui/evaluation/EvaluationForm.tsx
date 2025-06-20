'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Hospital, Linkedin, Link as LinkIcon, FileUp, X, PlusCircle } from "lucide-react";

interface EvaluationFormProps {
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
}

export const EvaluationForm = ({ isLoading, onSubmit }: EvaluationFormProps) => {
  // --- STEP 1: ADD STATE FOR EVERY INPUT FIELD ---
  // This ensures the data persists even when tabs are switched.
  const [candidateBio, setCandidateBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [hospitalUrl, setHospitalUrl] = useState('');
  const [additionalUrls, setAdditionalUrls] = useState<string[]>(['']);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // --- Helper functions for dynamic URLs (no changes here) ---
  const handleAddUrl = () => setAdditionalUrls([...additionalUrls, '']);
  const handleRemoveUrl = (index: number) => {
    const newUrls = additionalUrls.filter((_, i) => i !== index);
    setAdditionalUrls(newUrls);
  };
  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...additionalUrls];
    newUrls[index] = value;
    setAdditionalUrls(newUrls);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  // --- STEP 2: UPDATE handleSubmit TO USE STATE VARIABLES ---
  // This is a cleaner and more reliable way to build the form data.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    // Build the FormData directly from our state variables
    formData.append('candidate_bio', candidateBio);
    formData.append('linkedin_url', linkedinUrl);
    if (hospitalUrl) {
      formData.append('hospital_url', hospitalUrl);
    }
    
    additionalUrls.forEach(url => {
        if (url) formData.append('additional_urls', url);
    });

    selectedFiles.forEach(file => {
      formData.append('hospital_docs', file);
    });

    onSubmit(formData);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Evaluation Input</CardTitle>
        <CardDescription>Provide details in the tabs below to begin the analysis.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[60vh] overflow-y-auto pr-2">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="candidate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="candidate"><User className="mr-2 h-4 w-4" />Candidate Info</TabsTrigger>
              <TabsTrigger value="hospital"><Hospital className="mr-2 h-4 w-4" />Hospital Info</TabsTrigger>
            </TabsList>
            
            {/* --- STEP 3: BIND INPUTS TO THEIR STATE (CONTROLLED COMPONENTS) --- */}
            <TabsContent value="candidate" className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="candidate_bio">Candidate Bio / Profile Summary</Label>
                    <Textarea 
                      id="candidate_bio" 
                      name="candidate_bio" 
                      rows={5} required 
                      placeholder="Paste the candidate's biography..." 
                      value={candidateBio} // Bind value to state
                      onChange={(e) => setCandidateBio(e.target.value)} // Update state on change
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin_url" className="flex items-center"><Linkedin className="mr-2 h-4 w-4 text-blue-700" />LinkedIn URL</Label>
                    <Input 
                      id="linkedin_url" 
                      name="linkedin_url" 
                      type="url" required 
                      placeholder="https://linkedin.com/in/..."
                      value={linkedinUrl} // Bind value to state
                      onChange={(e) => setLinkedinUrl(e.target.value)} // Update state on change
                    />
                </div>
                <div className="space-y-2">
                  <Label>Additional Links (Articles, Case Studies, etc.)</Label>
                  {additionalUrls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                      <Input name="additional_urls" type="url" placeholder="https://..." value={url} onChange={(e) => handleUrlChange(index, e.target.value)} />
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveUrl(index)} disabled={additionalUrls.length === 1 && url === ''}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={handleAddUrl} className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Link
                  </Button>
                </div>
            </TabsContent>

            <TabsContent value="hospital" className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="hospital_url" className="flex items-center"><LinkIcon className="mr-2 h-4 w-4" />Hospital Website URL</Label>
                    <Input 
                      id="hospital_url" 
                      name="hospital_url" 
                      type="url" 
                      placeholder="https://yourhospital.com/about-us"
                      value={hospitalUrl} // Bind value to state
                      onChange={(e) => setHospitalUrl(e.target.value)} // Update state on change
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hospital_docs" className="flex items-center"><FileUp className="mr-2 h-4 w-4" />Upload Cultural Documents</Label>
                    <Input id="hospital_docs" name="hospital_docs" type="file" multiple onChange={handleFileChange} accept=".pdf,.docx,.txt" />
                    <p className="text-xs text-gray-500">You can select multiple files (PDF, DOCX, TXT).</p>
                    {selectedFiles.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            <p className="font-semibold">Selected files:</p>
                            <ul className="list-disc pl-5">
                                {selectedFiles.map(file => <li key={file.name}>{file.name}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isLoading} className="w-full mt-6">
            {isLoading ? "Analyzing..." : "Evaluate Fit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};