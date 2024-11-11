import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import PortalButton from "@/components/subscription/portal-button";
import { getSubscription } from "@/data/subscription";
import CheckoutButton from "@/components/subscription/checkout-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const userInitials = `${session.user.name?.split(" ")[0]?.[0] || ""}${
    session.user.name?.split(" ")[1]?.[0] || ""
  }`;
  const subscription = await getSubscription(session.user.id);
  return (
    <div className="flex w-full flex-col space-y-8 py-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-2xl px-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                />
                <AvatarFallback className="text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle>{session.user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Name</h3>
                  <p className="text-sm text-muted-foreground">
                    {session.user.name}
                  </p>
                </div>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  type="submit"
                  variant="destructive"
                  className="h-16 w-full text-xl"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Billing</CardTitle>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <h3 className="text-2xl font-medium">Current Plan</h3>

                    {subscription.status === "active" ? (
                      <p className="rounded-lg border border-success-foreground bg-success p-2 text-xl font-medium text-success-foreground">
                        <span className="text-success-foreground">
                          Pro Plan
                        </span>
                      </p>
                    ) : (
                      <p className="rounded-lg border border-muted-foreground bg-muted p-2 text-xl font-medium text-muted-foreground">
                        <span className="text-muted-foreground">Free Plan</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <h3 className="text-2xl font-medium">Status</h3>
                    <p className="text-xl font-medium">
                      {subscription.statusFormatted}
                    </p>
                  </div>

                  {subscription.renewsAt && !subscription.endsAt && (
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <h3 className="text-xl font-medium">
                        Next billing date:
                      </h3>
                      <p className="text-xl font-medium">
                        {new Date(subscription.renewsAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {subscription.endsAt && (
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <h3 className="text-xl font-medium">
                        Subscription ends:
                      </h3>
                      <p className="text-xl font-medium">
                        {new Date(subscription.endsAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <PortalButton className="h-16 w-full text-xl" />
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-muted-foreground">
                    No active subscriptions found. Upgrade to Pro to unlock all
                    features.
                  </p>
                  <CheckoutButton
                    className="h-16 w-full text-xl"
                    productId={
                      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ID!
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
