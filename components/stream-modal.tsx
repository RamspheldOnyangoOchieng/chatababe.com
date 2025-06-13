"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ComponentRef } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Hint from "@/components/hint";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

enum Scope {
  PUBLIC = "public",
  PRIVATE = "private",
}
enum Type {
  MALE = 'male',
  FEMALE = 'female',
  COUPLE = 'couple',
  TRANS = 'trans'
}

const StreamModal = () => {
  const closeRef = useRef<ComponentRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {user} = useUser(); 

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [data, setData] = useState({
    name: "",
    goal: "",
    variant: Scope.PUBLIC,
    type: Type.FEMALE
  });

  const onRemove = () => {
    setThumbnailUrl(null);
  };
  const isPublic = data.variant === "public";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      createStream({
        name: data.name,
        goalText: data.goal,
        thumbnailUrl: thumbnailUrl,
        type: data.type,
        isPublic: isPublic,
      })
        .then(() => {
          toast.success("Stream created");
          closeRef?.current?.click();
          router.push(`/${user?.username}/`)
        })
        .catch(() => {
          toast.error("Stream already exists");
          closeRef?.current?.click();
        });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent lg:ml-auto max-lg:link-text" disabled={!user}>Broadcast yourself</button>
      </DialogTrigger>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle>Create stream </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={data.name}
              className="ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-n-4/30 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      variant="default"
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "black",
                    },
                    button: {
                      color: "black",
                      fontWeight: 500,
                    },
                    allowedContent: {
                      color: "black",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Goal</Label>
            <Input
              name="goal"
              disabled={isPending}
              placeholder="Stream's goal/target"
              onChange={onChange}
              value={data.goal}
              className="ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-n-4/30 font-medium"
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-4 text-n-1">Stream Type</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  name="type"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Type.FEMALE}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                  defaultChecked
                />
                <Label className="text-n-2 peer-checked:text-n-1">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  name="type"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Type.MALE}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                />
                <Label className="text-n-2 peer-checked:text-n-1">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  name="type"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Type.COUPLE}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                />
                <Label className="text-n-2 peer-checked:text-n-1">
                  Couple
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  name="type"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Type.TRANS}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                />
                <Label className="text-n-2 peer-checked:text-n-1">
                  Trans
                </Label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-4 text-n-1">Stream Scope</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  name="variant"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Scope.PUBLIC}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                  defaultChecked
                />
                <Label className="text-n-2 peer-checked:text-n-1">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  name="variant"
                  disabled={isPending}
                  type="radio"
                  onChange={onChange}
                  value={Scope.PRIVATE}
                  className="w-4 h-4 checked:bg-primary-3 peer"
                />
                <Label className="text-n-2 peer-checked:text-n-1">
                  Private
                </Label>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="default" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StreamModal;
