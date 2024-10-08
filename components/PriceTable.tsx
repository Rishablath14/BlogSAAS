import { PricingTable } from "@/app/components/shared/Pricing";
import prisma from "@/utils/db";
import { requireUserDB } from "@/utils/requireUser";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export default async function PricingSection() {
  const user = await requireUserDB();
  let data;
  if(user) {data = await getData(user?.id?user.id:"");}
  return (
    <div className="px-2 sm:px-4 md:px-6 py-4 md:py-6">
      <PricingTable loggedIn={user!==null} role={user?.role?user.role:"READER"} status={data?.status === "active"} />
    </div>
  );
}
