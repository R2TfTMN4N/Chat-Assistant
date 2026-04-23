import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ConversationsPanel } from "../components/conversations-panel";
import { InboxIcon } from "lucide-react";

export const ConversationsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-muted/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="relative mx-auto max-w-screen-lg py-4 px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <InboxIcon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Conversations
              </h1>
              <p className="text-muted-foreground mt-1">
                View and manage your customer support conversations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="flex-1 min-h-0 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <ResizablePanelGroup className="h-full" direction="horizontal">
          <ResizablePanel
            defaultSize={30}
            maxSize={40}
            minSize={20}
            className="hidden md:block border-r border-border/50 bg-gradient-to-br from-primary/5 via-background to-muted/20"
          >
            <ConversationsPanel />
          </ResizablePanel>
          <ResizableHandle className="hidden md:block bg-transparent hover:bg-primary/20 transition-colors" />
          <ResizablePanel
            className="h-full bg-gradient-to-br from-primary/5 via-background to-muted/20"
            defaultSize={65}
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
