// app/paths/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import StarField from "@/components/ui/StarField";
import { QUESTIONS_POOL, Question, QuestionnaireOption } from "@/lib/questions";
import {
  Compass, Sparkles, Brain, Landmark, Heart,
  ArrowRight, RotateCcw, ArrowLeft, ArrowUpRight
} from "lucide-react";

interface PathStep {
  title: string;
  desc: string;
  path: string;
}

interface PathResult {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  steps: PathStep[];
  bridgeText?: string;
  destination: string;
}

interface UserAnswer {
  questionText: string;
  selectedOptionText: string;
  orientation: "seeker" | "scientific" | "contemplative" | "practical";
}

// Durstenfeld shuffle to select exactly 6 random questions
function getSixRandomQuestions(pool: Question[]): Question[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 6);
}

export default function PathsPage() {
  const [step, setStep] = useState(0); // 0: Start, 1: Questionnaire, 2: Loading, 3: Result
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedPath, setGeneratedPath] = useState<PathResult | null>(null);

  const startQuestionnaire = () => {
    const questions = getSixRandomQuestions(QUESTIONS_POOL);
    setSelectedQuestions(questions);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setStep(1);
  };

  const handleOptionSelect = (option: QuestionnaireOption) => {
    if (loading) return;

    const currentQuestion = selectedQuestions[currentQuestionIdx];
    const newAnswer: UserAnswer = {
      questionText: currentQuestion.text,
      selectedOptionText: option.text,
      orientation: option.orientation,
    };

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIdx] = newAnswer;
    setUserAnswers(updatedAnswers);

    // Briefly show the golden border selection before advancing
    setTimeout(async () => {
      if (currentQuestionIdx < selectedQuestions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else {
        // Completed all questions - send answers to server
        setStep(2);
        setLoading(true);

        try {
          const res = await fetch("/api/paths/align", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: updatedAnswers }),
          });

          if (!res.ok) throw new Error("Failed to generate path");
          const data = await res.json();
          setGeneratedPath(data);
          setStep(3);
        } catch (err) {
          console.error(err);
          alert("Alignment computation failed. Please re-run the diagnostic.");
          setStep(0);
        } finally {
          setLoading(false);
        }
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const resetQuestionnaire = () => {
    setStep(0);
    setSelectedQuestions([]);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    setGeneratedPath(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "seeker": return Compass;
      case "scientific": return Brain;
      case "contemplative": return Landmark;
      case "practical": return Heart;
      default: return Sparkles;
    }
  };

  const ResultIcon = generatedPath ? getIcon(generatedPath.icon) : Compass;
  const progressPercent = selectedQuestions.length > 0 
    ? ((currentQuestionIdx + 1) / selectedQuestions.length) * 100 
    : 0;

  return (
    <main
      className="relative flex flex-col min-h-screen overflow-hidden text-gold-light"
      style={{ backgroundColor: "#05060b" }}
    >
      <StarField blur />
      <Header />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-20 w-full flex-1 flex flex-col items-center justify-center min-h-0">
        
        {/* STEP 0: START */}
        {step === 0 && (
          <div className="text-center max-w-xl animate-fade-in">
            <div className="mb-6 w-16 h-16 rounded-full border border-gold-matte/20 flex items-center justify-center bg-gold-matte/5 mx-auto">
              <Compass className="w-8 h-8 text-gold-bright animate-spin-slow" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-gold-matte/60 block mb-2">
              Inquiry Alignment
            </span>
            <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-gold-bright mb-6">
              Find Your Path
            </h1>
            <p className="text-sm font-light text-gold-matte/75 leading-relaxed mb-8 italic">
              Consciousness cannot be mapped with standard templates. Answer 6 short, reflective multiple-choice questions to diagnose your orientation, and our AI will synthesize a customized navigation path across the Tree of Truth.
            </p>
            <button
              onClick={startQuestionnaire}
              className="group relative px-8 py-3.5 overflow-hidden rounded-full border text-xs tracking-widest font-serif transition-all duration-300 border-gold-matte/40 bg-gold-matte/5 text-gold-light hover:border-gold-bright hover:bg-gold-matte/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
            >
              BEGIN INQUIRY
            </button>
          </div>
        )}

        {/* STEP 1: MULTIPLE CHOICE QUESTIONNAIRE */}
        {step === 1 && selectedQuestions.length > 0 && (
          <div className="w-full max-w-2xl flex flex-col bg-cosmic-deep/30 border border-gold-matte/10 rounded-2xl p-6 md:p-8 backdrop-blur-md animate-fade-in">
            
            {/* Header info / Progress Bar */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div>
                <h2 className="font-serif text-sm text-gold-bright">Diagnostic Alignment</h2>
                <span className="text-[9px] uppercase tracking-wider font-mono text-gold-matte/45 block mt-0.5">
                  Question {currentQuestionIdx + 1} of {selectedQuestions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-gold-matte/55 bg-gold-matte/5 px-2.5 py-1 rounded-full border border-gold-matte/10">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-pulse" />
                Active Diagnosis
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-1 bg-[#090b14] rounded-full overflow-hidden mb-8 border border-gold-matte/5 shrink-0">
              <div 
                className="h-full bg-gradient-to-r from-gold-matte via-gold-bright to-gold-matte transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="mb-6 min-h-[4.5rem] flex items-center">
              <h3 className="font-serif text-lg md:text-xl text-gold-bright/95 leading-relaxed">
                {selectedQuestions[currentQuestionIdx].text}
              </h3>
            </div>

            {/* Options Grid */}
            <div className="flex flex-col gap-3.5 mb-8">
              {selectedQuestions[currentQuestionIdx].options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestionIdx]?.selectedOptionText === opt.text;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt)}
                    className={`text-left p-4 rounded-xl border text-xs leading-relaxed font-light transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? "bg-gold-matte/15 border-gold-bright text-white shadow-[0_0_15px_rgba(212,175,55,0.15)] translate-x-1" 
                        : "bg-[#0c0e18]/80 border-gold-matte/10 hover:border-gold-matte hover:bg-gold-matte/5 hover:translate-x-1 text-gold-light"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono shrink-0 ${
                        isSelected 
                          ? "border-gold-bright bg-gold-bright text-[#05060b]" 
                          : "border-gold-matte/30 text-gold-matte/60 bg-[#05060b]"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-gold-matte/10 shrink-0">
              <button
                onClick={handleBack}
                disabled={currentQuestionIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-[10px] tracking-wider uppercase font-mono transition-all duration-300 border-gold-matte/10 text-gold-matte/65 hover:text-gold-bright hover:border-gold-bright disabled:opacity-30 disabled:hover:text-gold-matte/65 disabled:hover:border-gold-matte/10 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              
              <span className="text-[9px] uppercase tracking-widest font-mono text-gold-matte/30">
                Science of Truth
              </span>
            </div>

          </div>
        )}

        {/* STEP 2: COMPUTING ALIGNMENT LOADING */}
        {step === 2 && (
          <div className="text-center max-w-xl animate-fade-in flex flex-col items-center">
            <div className="mb-6 w-20 h-20 rounded-full border border-gold-bright/35 flex items-center justify-center bg-gold-matte/5 glow-node">
              <Compass className="w-10 h-10 text-gold-bright animate-spin" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-gold-bright animate-pulse block mb-3">
              Synthesizing Responses
            </span>
            <h2 className="font-serif text-xl md:text-2xl text-gold-light/90 mb-4">
              Aligning Your Core Inquiry
            </h2>
            <p className="text-xs font-light text-gold-matte/50 leading-relaxed max-w-sm italic">
              Tracing your philosophical coordinates across branches, roots, and sage nodes to map your journey...
            </p>
          </div>
        )}

        {/* STEP 3: RESULT VIEW */}
        {step === 3 && generatedPath && (
          <div className="w-full max-w-3xl animate-fade-in">
            
            {/* Header Result */}
            <div className="text-center mb-10">
              <div className="mb-4 w-12 h-12 rounded-full border border-gold-matte/20 flex items-center justify-center bg-gold-matte/5 mx-auto">
                <ResultIcon className="w-6 h-6 text-gold-bright" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-mono text-gold-matte/55 block mb-1">
                Your Aligned Path
              </span>
              <h2 className="font-serif text-3xl text-gold-bright mb-2">
                {generatedPath.title}
              </h2>
              <p className="text-xs tracking-wider text-gold-matte/75 font-light mb-6 uppercase">
                {generatedPath.subtitle}
              </p>
              <p className="text-xs leading-relaxed font-light text-gold-light/80 italic max-w-xl mx-auto border-t border-b py-4 border-gold-matte/10">
                {generatedPath.description}
              </p>
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="font-serif text-xs uppercase tracking-wider text-gold-matte/50 mb-1">
                Recommended Sequence
              </h3>
              {generatedPath.steps.map((s, idx) => (
                <Link
                  key={idx}
                  href={s.path}
                  className="group flex gap-4 items-center p-4 rounded-xl border transition-all border-gold-matte/15 hover:border-gold-matte bg-cosmic-deep/30 hover:bg-cosmic-deep/50 hover:translate-x-1"
                >
                  <div className="w-8 h-8 rounded-full border border-gold-matte/20 flex items-center justify-center bg-[#05060b] text-gold-bright text-[10px] font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xs text-gold-bright group-hover:text-white transition-colors flex items-center gap-1.5">
                      {s.title}
                      <ArrowUpRight className="w-3 h-3 text-gold-matte/30 opacity-0 group-hover:opacity-100 transition-all" />
                    </h4>
                    <p className="text-[10px] leading-relaxed font-light text-gold-light/75 mt-0.5">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-matte/30 transition-all group-hover:text-gold-bright group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            {/* Bridge Quote */}
            {generatedPath.bridgeText && (
              <div className="p-5 border rounded-2xl italic text-[11px] leading-relaxed text-gold-matte font-light mb-8 bg-gold-matte/5 border-gold-matte/10 text-center">
                &ldquo;{generatedPath.bridgeText}&rdquo;
              </div>
            )}

            {/* Destination Panel */}
            <div className="border rounded-2xl p-5 border-gold-matte/10 bg-[#0c0e18]/80 text-center mb-10">
              <span className="text-[9px] uppercase tracking-widest text-gold-matte/60 block mb-1 font-semibold">
                Ultimate Destination
              </span>
              <p className="text-xs font-light text-gold-light/95 leading-relaxed">
                {generatedPath.destination}
              </p>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={resetQuestionnaire}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-[10px] font-bold tracking-widest uppercase cursor-pointer border-gold-matte/20 hover:border-gold-matte bg-cosmic-deep/60 hover:bg-cosmic-deep/80 text-gold-light"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Align Again
              </button>
              <Link
                href="/"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-full border text-[10px] font-bold tracking-widest uppercase border-gold-matte/30 bg-gold-matte/5 hover:bg-gold-matte/10 hover:border-gold-bright text-gold-light"
              >
                Return to Tree Map
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
