"use client";

import { UploadDropzone } from "@/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Atom } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { SubmitButton } from "../SubmitButtons";
import { use, useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/utils/zodSchemas";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { CreatePostAction, deleteImageFromUploadthing, EditPostActions } from "@/actions";
import Editor from "../EditorWrapper";
import { useUserInfo } from "@/components/AppContext";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    content:string|undefined;
    catSlug: string;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {
  const slugify = (str:string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [category, setCategoryValue] = useState<string>(data.catSlug);
  const [lastResult, action] = useActionState(EditPostActions, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
   
  const {userInfo}:any = useUserInfo();
  function handleSlugGeneration() {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Pleaes create a title first");
    }

    setSlugValue(slugify(titleInput));

    return toast.success("Slug has been created");
  }
  const {user} = useKindeBrowserClient();
  console.log(user);
  
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>
        Edit your article for your blog with the form below and submit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="Nextjs blogging application"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              placeholder="Article Slug"
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <Button
              onClick={handleSlugGeneration}
              className="w-fit"
              variant="secondary"
              type="button"
            >
              <Atom className="size-4 mr-2" /> Generate Slug
            </Button>
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
          </div>
          <div className="grid gap-2">
              <Label>Category</Label>
              <select
              key={fields.category.key}
              name={fields.category.name}
              defaultValue={fields.category.initialValue}
              value={category}
              className="w-max p-4"
              onChange={(e) => setCategoryValue(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="style">style</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="coding">coding</option>
              </select>
              <p className="text-red-500 text-sm">
                {fields.category.errors}
              </p>
            </div>
          <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data.smallDescription}
              placeholder="Small Description for your blog article..."
              className="h-32"
            />
            <p className="text-red-500 text-sm">
              {fields.smallDescription.errors}
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <input
              type="hidden"
              name={fields.coverImage.name}
              key={fields.coverImage.key}
              defaultValue={fields.coverImage.initialValue}
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

            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Article Content</Label>
              <input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              {userInfo && userInfo.Subscription?.status === "active"?<>
              <p className="text-sm text-gray-500">Press &apos; / &apos; to see the command lists</p>
                <Editor onChange={setValue} initialValue={value} /> 
              </>
              :<Textarea
              name={fields.content.name}
              key={fields.content.key}
              className="h-40"
              placeholder="Write your blog content here..."
              defaultValue={data.content}
            />}
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>

          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
