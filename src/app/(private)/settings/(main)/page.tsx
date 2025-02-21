import { auth } from "@/auth";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) return;

  return (
    <ProfileForm
      defaultValues={{
        id: "user-id",
        email: "jaaopbr@gmail.com",
        image: "https://github.com/7cass.png",
        name: "João Pedro A.",
      }}
    />
  );
}
