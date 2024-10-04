"use client";

import { UploadDropzone } from "@/utils/UploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/actions";

interface iAppProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  console.log(imageUrl);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your Channel. you can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4 border border-zinc-800 border-dashed rounded-lg">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Image has been uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong.");
            }}
          />
          {imageUrl &&
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-contain rounded-lg"
            />}
            </div>
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
