import { useAuthSession } from "@/components/auth-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCollection } from "@/hooks/Endpoint collections/EndpointsCollection.Mutation";
import { useDeleteApiEndpoints } from "@/hooks/Endpoints/Endpoints.Mutation";

export function AlertDialogDemo({ action, target, name }: any) {
  const { session } = useAuthSession();

  const { mutateAsync: deleteEndpoint } = useDeleteApiEndpoints(
    session?.token || ""
  );
  const { mutateAsync: deleteCollection } = useDeleteCollection(
    session?.token || ""
  );

  const handleDelete = async () => {
    try {
      if (target.Type === "Collection") await deleteCollection(target.ID);
      else await deleteEndpoint(target.ID);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-none">
          <img src="/icons/delete.svg" className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            {" " + name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action ? action : handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
