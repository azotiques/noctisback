import { editEvent, insertEvents } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, EllipsisVertical, FlipHorizontal, LucideImageMinus, LucideMenu, Menu, MenuIcon, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Textarea } from "./ui/textarea";

export default function AddArtist() {
    const [artist, setArtist] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const qc = useQueryClient();

    const {mutate: insertEvent, error: insertError} = useMutation(
      {
        mutationFn: insertEvents,
        onSuccess: () => {
          qc.invalidateQueries({queryKey: ["events"]});
        }
      }
    )

    const handleInsertSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      insertEvent({artist, description, image});
      setArtist("");
      setDescription("");
      setImage("");
    }

    return <>
        <div className="flex flex-row py-5 justify-between">
          <h1 className="text-2xl font-semibold">Add Events</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost">
                <Plus className="size-5"/>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
              </DialogHeader>
              <form className="p-20 flex flex-col gap-y-7" onSubmit={handleInsertSubmit}>
                <div className="flex flex-col gap-y-2">
                  <Label>Event</Label>
                  <Input value={artist} onChange={(e) => setArtist(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label>Image</Label>
                  <Input value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                 <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">Submit</Button>
                  </DialogClose>
                 </DialogFooter>
               </form>
            </DialogContent>
          </Dialog>
        </div>
        </>
}