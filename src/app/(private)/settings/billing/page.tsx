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

export default async function Page() {
  return (
    <form>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Plan Usage</CardTitle>
          <CardDescription>
            You are currently on the{" "}
            <span className="uppercase font-bold">FREE</span> plan.
            <span className="block">
              <small>Expires in: {"17/03/2025"}</small>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">1/10</span>
              <span className="text-muted-foreground text-sm">10%</span>
            </header>
            <main>
              <Progress value={10} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border pt-6">
          <span>
            You are subscribed to the PRO plan with more tasks and support.
          </span>
          <Button disabled>
            Wait until <span className="uppercase px-1">FREE</span>
            expires
          </Button>
          <Button type="submit">Cancel Subscription</Button>
        </CardFooter>
        <CardFooter className="flex items-center justify-between border-t border-border pt-6">
          <span>Upgrade to PRO for more tasks and support</span>
          <Button type="submit">Subscribe for $0,99/mo</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
