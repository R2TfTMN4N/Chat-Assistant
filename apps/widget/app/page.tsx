"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";
export default function Page() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Widget</h1>
        <Button size="sm" onClick={() => startCall()}>
          Start Call
        </Button>
        <Button size="sm" variant="destructive" onClick={() => endCall()}>
          End Call
        </Button>
        <p>isConnected: {isConnected ? "Yes" : "No"}</p>
        <p>isConnecting: {isConnecting ? "Yes" : "No"}</p>
        <p>isSpeaking: {isSpeaking ? "Yes" : "No"}</p>
        <p>{JSON.stringify(transcript)}</p>
      </div>
    </div>
  );
}
