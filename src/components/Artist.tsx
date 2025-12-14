import { deleteEvent, editEvent } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Textarea } from "./ui/textarea";

export default function Artist(props: {id: string, artist: string, description: string, image: string, link: string}) {
    const [artist, setArtist] = useState<string>(props.artist);
    const [description, setDescription] = useState<string>(props.description);
    const [image, setImage] = useState<string>(props.image);
    const [link, setLink] = useState<string>(props.link);

    const qc = useQueryClient();

    const {mutate: editEvents} = useMutation(
        {
          mutationFn: editEvent,
          onSuccess: () => {
            qc.invalidateQueries({queryKey: ["events"]});
          }
        }
      )

    const {mutate: deleteEvents} = useMutation(
      {
        mutationFn: deleteEvent,
        onSuccess: () => {
          qc.invalidateQueries({queryKey: ["events"]});
        }
      }
    )

    const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      editEvents({id: props.id, artist, description, image, link})
    }

    return <>
        <div className="flex flex-row items-center justify-between text-l border-b py-5">
          <h1>{artist}</h1>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <EllipsisVertical className="size-5"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 w-full text-right">
                        <span className="px-2 py-1.5 text-sm font-medium data-inset:pl-8">Edit</span>
                        <Edit />
                      </button>
                    </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                      deleteEvents(props.id);
                    }}>
                  <DropdownMenuLabel>
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuLabel>
                  <Trash className="text-red-500" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              <form className="p-20 flex flex-col gap-y-7" onSubmit={handleEditSubmit}>
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
                <div className="flex flex-col gap-y-2">
                  <Label>Link</Label>
                  <Input value={link} onChange={(e) => setLink(e.target.value)}/>
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