import Image from "next/image";

export const ConversationsView = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted">
           {" "}
      <div className="flex flex-1 items-center justify-center gap-x-2">
               {" "}
        <Image
          alt="Logo"
          src="/ai-chatbot-assistant-software-logo-cute-style-no-title-loook-str.svg"
          width={400}
          height={400} // Added the required height prop
        />
             {" "}
      </div>
         {" "}
    </div>
  );
};
