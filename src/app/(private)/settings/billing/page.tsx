import {
  cancelSubscriptionAction,
  createCheckoutSessionAction,
} from "@/app/actions/billing";
import { getUserCurrentPlan } from "@/app/stripe";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const plan = await getUserCurrentPlan(session.user.id);

  return (
    <form
      action={
        session.user.plan === "FREE"
          ? createCheckoutSessionAction
          : cancelSubscriptionAction
      }
    >
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Plan Usage</CardTitle>
          <CardDescription>
            You are currently on the{" "}
            <span className="font-bold">{plan.name}</span> plan.
            {plan.current_period_end && (
              <small className="block">
                Expires in: {formatDate(new Date(plan.current_period_end))}
              </small>
            )}
          </CardDescription>
        </CardHeader>
        {plan.name === "PRO" && (
          <CardFooter className="flex items-center justify-between pt-6">
            <span>
              You are subscribed to the PRO plan with more tasks and support.
            </span>
            <Button type="submit">Cancel Subscription</Button>
          </CardFooter>
        )}
        {plan.name === "FREE" && (
          <>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <header className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {plan.quota.links.current}/{plan.quota.links.available}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {plan.quota.links.usage}%
                  </span>
                </header>
                <main>
                  <Progress value={plan.quota.links.usage} />
                </main>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-6">
              <p>
                Upgrade to <span className="font-bold">PRO</span> for more
                features and priority support.
              </p>
              <Button type="submit">Subscribe for $5/mo</Button>
            </CardFooter>
          </>
        )}
      </Card>
    </form>
  );
}
