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

const PopUpDialog = ({
  setOpen,
  open,
  noTrigger,
  trigger,
  title,
  desc,
  cancel,
  proceed,
  handlerFunction,
}) => {
  // console.log(open, "open");
  return (
    <AlertDialog {...(open === undefined ? {} : { open })}>
      {noTrigger ? <></> : <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            {...(setOpen ? { onClick: () => setOpen(false) } : {})}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handlerFunction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopUpDialog;
