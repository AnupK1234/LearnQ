import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileUp,
  FileText,
  CheckCircle,
  Upload,
  HelpCircle,
  Download,
  FlaskConical,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axiosInstance";

const AssignmentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const sampleSummary = `
# Assignment Summary: Environmental Science Report

## Key Topics Covered:
- Climate change impacts on biodiversity
- Greenhouse gas emission trends (2000-2022)
- Renewable energy transition challenges
- Carbon sequestration methods comparison
- Policy recommendations for sustainable development

## Main Arguments:
1. Global warming is accelerating faster than predicted by earlier models
2. Biodiversity loss is directly correlated with climate change variables
3. Renewable energy adoption faces significant infrastructure hurdles
4. Carbon capture technologies require substantial scaling to be effective
5. Policy frameworks must integrate both mitigation and adaptation strategies

## Research Quality:
- Well-supported with scientific data and peer-reviewed sources
- Effectively presents complex climate science concepts visually
- Strong methodology section with clear experimental design
- Comprehensive literature review covering latest research

## Areas for Improvement:
- Economic analysis of proposed solutions could be strengthened
- Consider expanding the discussion on international climate policy coordination
- More detail on implementation challenges in developing economies needed

## Overall Assessment:
This is a thoroughly researched report that effectively synthesizes current environmental science knowledge on climate change impacts and potential solutions. The analysis is data-driven and the conclusions follow logically from the evidence presented.
  `;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, Word document, or text file only.");
      return;
    }

    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error(
        "File size exceeds 10MB limit. Please upload a smaller file."
      );
      return;
    }

    setFile(selectedFile);
    toast.success("File selected successfully.");
  };

  const processFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setIsUploading(false);
    setIsProcessing(true);

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post("/summarize", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSummary(res.data.markdownSummary);
    setIsProcessing(false);
    setUploadComplete(true);
    toast.success("Assignment processed successfully!");
  };

  const handleGenerateQuiz = () => {
    navigate("/quiz");
    toast.success("Navigating to quiz generator...");
  };

  const resetUpload = () => {
    setFile(null);
    setUploadComplete(false);
    setSummary(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Study Material</h1>

        <Tabs defaultValue="assignment">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="assignment" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Assignment Upload
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" /> Flashcard Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileUp className="mr-2 h-5 w-5 text-study-primary" />
                  Upload Assignment
                </CardTitle>
                <CardDescription>
                  Upload your assignment to get an AI-generated summary and
                  assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadComplete ? (
                  <>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                        ${
                          isDragging
                            ? "border-study-primary bg-study-primary/5"
                            : "border-muted"
                        }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-muted p-3">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Drag & drop your file here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF, Word documents, and text files (max
                            10MB)
                          </p>
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Button
                            variant="secondary"
                            type="button"
                            onClick={handleClick}
                          >
                            Browse Files
                          </Button>
                        </label>
                      </div>
                    </div>

                    {file && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-study-primary" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={processFile}
                            disabled={isUploading || isProcessing}
                          >
                            {isProcessing
                              ? "Processing..."
                              : isUploading
                              ? "Uploading..."
                              : "Process File"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-muted/30 p-4 border">
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">Upload Complete</h3>
                      </div>

                      <div className="prose dark:prose-invert max-w-none">
                        <div className="bg-card p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
                          {summary}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-6">
                        <Button
                          onClick={handleGenerateQuiz}
                          className="flex items-center"
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Generate Quiz
                        </Button>
                        <Button variant="outline" className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Summary
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={resetUpload}
                          className="flex items-center"
                        >
                          <FileUp className="mr-2 h-4 w-4" />
                          Upload Another File
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FlaskConical className="mr-2 h-5 w-5 text-study-accent" />
                  Flashcard Generator
                </CardTitle>
                <CardDescription>
                  Upload study material to generate interactive flashcards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <Button
                    onClick={() => navigate("/flashcards")}
                    className="flex items-center"
                  >
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Go to Flashcard Generator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssignmentUpload;
