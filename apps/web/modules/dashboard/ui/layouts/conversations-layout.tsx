import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ConversationsPanel } from "../components/conversations-panel";

export const ConversationsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel
        defaultSize={30}
        maxSize={30}
        minSize={20}
        className="border-r border-border/50"
      >
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent hover:bg-primary/20 transition-colors" />
      <ResizablePanel className="h-full" defaultSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
