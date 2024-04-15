import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableDemo({ componentOne, componentTwo }: any) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>{componentOne}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>{componentTwo}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
