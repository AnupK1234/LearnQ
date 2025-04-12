"use client";
import React, { useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import DottedFace from "./DottedFace";

interface avatarSettings {
  name: string;
  openai_voice: "alloy"|"ash"|"ballad"|"coral"|"echo"|"sage"|"shimmer"|"verse";
  openai_model: string;
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Frank",
  openai_voice: "echo",
  openai_model: "gpt-4o-mini-realtime-preview-2024-12-17", // Use "gpt-4o-mini-realtime-preview-2024-12-17" for cheaper and faster responses
  simli_faceid: "5514e24d-6086-46a3-ace4-6a7264e5cb7c",
  initialPrompt:
    "You are an AI mentor specialized in teaching. Your role is to provide tailored guidance, practical advice, and resources to students.",
};

const Avatar2: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div className="bg-slate-700">
          {showDottedFace && <DottedFace />}
          <SimliOpenAI
            openai_voice={avatar.openai_voice}
            openai_model={avatar.openai_model}
            simli_faceid={avatar.simli_faceid}
            initialPrompt={avatar.initialPrompt}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar2;
