import { handleSignOut } from "@/app/lib/actions"

export default function LogOutButton() {
  return (
        <form action={handleSignOut}>
            <button>
                <div>
                    Log out
                </div>
            </button>
        </form>
    ) 
}

export { LogOutButton }