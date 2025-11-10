import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}
export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  useEffect(() => {
    const vapiInstance = new Vapi("c4dbffd3-ba2b-4e7a-9cd8-9d0a423393a0");
    setVapi(vapiInstance);
    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });
    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });
    vapiInstance.on("error", (error) => {
      console.error("VAPI Error:", error);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prevTranscript) => [
          ...prevTranscript,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });
    return () => {
      vapiInstance?.stop();
    };
  }, []);
  const startCall = () => {
    if (vapi) {
      vapi.start("bb93a277-73f0-4ee4-bf1e-ef96c922b19e");
    }
  };
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  };
};
