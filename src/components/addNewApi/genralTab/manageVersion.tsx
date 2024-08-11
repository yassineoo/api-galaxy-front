/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Pm8HOK08u9g
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function ManageVersions({ versions }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-4 h-4" />
          <span>Manage Versions</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Manage Versions</DialogTitle>
        </DialogHeader>
        <div className="border-b border-muted-foreground/20 py-4" />
        <div className="grid grid-cols-[1fr_1fr] gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Versions</h3>
              <Button variant="outline" size="sm">
                + Add
              </Button>
            </div>
            <div className="space-y-2">
              {versions.map((version: string) => (
                <Button variant="ghost" className="justify-start w-full">
                  {version}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Version Details</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="version">Version</Label>
                <Input id="version" value="v3" readOnly />
              </div>
              <div className="grid gap-2">
                <RadioGroup defaultValue="active">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="active"
                      id="active"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="active"
                      className="flex items-center gap-2 cursor-pointer flex-col"
                    >
                      <div className="h-4 w-4 rounded-full border border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-checked:bg-primary">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
                      </div>
                      Active Version
                    </Label>
                    <p className="text-muted-foreground">
                      The current version that is live and available to users.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="draft"
                      id="draft"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="draft"
                      className="flex items-center gap-2 cursor-pointer flex-col"
                    >
                      <div className="h-4 w-4 rounded-full border border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-checked:bg-primary">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
                      </div>
                      Draft Version
                    </Label>
                    <p className="text-muted-foreground">
                      Initially created and visible only to the provider
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="deprecated"
                      id="deprecated"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="deprecated"
                      className="flex items-center gap-2 cursor-pointer flex-col"
                    >
                      <div className="h-4 w-4 rounded-full border border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-checked:bg-primary">
                        <div className="h-2 w-2 rounded-full bg-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
                      </div>
                      Deprecated Version
                    </Label>
                    <p className="text-muted-foreground">
                      No longer recommended to use
                    </p>
                  </div>
                </RadioGroup>
                <div className="flex items-center gap-2">
                  <Checkbox id="current" className="ml-auto" />
                  <Label htmlFor="current" className="cursor-pointer">
                    Current
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
