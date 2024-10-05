import CreateBlog from "@/app/components/dashboard/CreateBlog";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { ArrowLeft} from "lucide-react";
import Link from "next/link";

export default async function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const data = await prisma.category.findMany();
  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/channels/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <CreateBlog siteId={params.siteId} categories={data}/>
    </>
  );
}
