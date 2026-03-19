import { signOutAction } from "@/lib/auth";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button variant="outline" size="sm" type="submit">
        Đăng xuất
      </Button>
    </form>
  );
}
