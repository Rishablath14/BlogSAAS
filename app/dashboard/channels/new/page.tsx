"use client";

import { CreateSiteAction, deleteImageFromUploadthing } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/utils/zodSchemas";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { UploadDropzone } from "@/utils/UploadthingComponents";
import Image from "next/image";
import { toast } from "sonner";

export default function NewSiteRoute() {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Create Channel</CardTitle>
          <CardDescription>
            Create your Channel here. Click the button below once your done...
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Channel Name</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                  placeholder="Channel Name"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>

              <div className="grid gap-2">
                <Label>Subdirectory</Label>
                <Input
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                  placeholder="Subdirectory"
                />
                <p className="text-red-500 text-sm">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                name={fields.imageUrl.name}
                key={fields.imageUrl.key}
                defaultValue={fields.imageUrl.initialValue}
                value={imageUrl}
              />
              <div className="flex flex-col sm:flex-row items-center gap-4 border border-zinc-800 border-dashed rounded-lg">
                <UploadDropzone
                className="flex-1"
                  onClientUploadComplete={(res) => {
                    if(imageUrl) deleteImageFromUploadthing([imageUrl.substring(imageUrl.lastIndexOf("/") + 1)]);
                    setImageUrl(res[0].url);
                    toast.success("Image has been uploaded");
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast.error("Something went wrong...");
                  }}
                  />
                  {imageUrl &&
                <Image
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="object-contain flex-1 w-[200px] h-[250px] rounded-lg"
                  width={200}
                  height={200}
                />
                }
                </div>
              <p className="text-red-500 text-sm">{fields.imageUrl.errors}</p>
            </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Small Description for your Channel"
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Create Channel" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
