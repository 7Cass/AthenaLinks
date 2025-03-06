import { createCheckoutSessionAction } from "@/app/actions/billing";
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

export default async function Page() {
  const session = await auth();

  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Plan Usage</CardTitle>
          <CardDescription>
            You are currently on the{" "}
            <span className="font-bold">{session?.user.plan}</span> plan.
            {session?.user.current_period_end && (
              <small className="block">
                Expires in:{" "}
                {formatDate(new Date(session?.user.current_period_end))}
              </small>
            )}
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">1/10</span>
              <span className="text-muted-foreground text-sm">10%</span>
            </header>
            <main>
              <Progress value={10} />
            </main>
          </div>
        </CardContent> */}
        {/* <CardFooter className="flex items-center justify-between border-t border-border pt-6">
          <span>
            You are subscribed to the PRO plan with more tasks and support.
          </span>
          <Button disabled>
            Wait until <span className="uppercase px-1">FREE</span>
            expires
          </Button>
          <Button type="submit">Cancel Subscription</Button>
        </CardFooter> */}
        <CardFooter className="flex items-center justify-between pt-6">
          <p>
            Upgrade to <span className="font-bold">PRO</span> for more features
            and priority support.
          </p>
          <Button type="submit">Subscribe for $5/mo</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
