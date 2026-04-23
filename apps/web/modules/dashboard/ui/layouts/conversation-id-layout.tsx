import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ContactPanel } from "../components/contact-panel";

export const ConversationIdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
      <ResizablePanel className="h-full" defaultSize={60}>
        <div className="flex h-full flex-1 flex-col">{children}</div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:block bg-transparent hover:bg-primary/20 transition-colors" />
      <ResizablePanel
        className="hidden lg:block border-l border-border/50"
        defaultSize={30}
        maxSize={30}
        minSize={20}
      >
        <ContactPanel></ContactPanel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
