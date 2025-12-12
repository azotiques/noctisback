import { supabase } from "@/supabaseClient";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { LogOut, PartyPopper, PartyPopperIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Header() {
  const navigate = useNavigate();

  const handleSignout = async() => {
    await supabase.auth.signOut();
    navigate({to: "/login"});
  };

  return (
    <>
      <aside className="h-screen flex flex-col px-3 py-2 justify-between">
        <div className="flex flex-col items-left gap-y-8 justify-between p-4">
          <img src="./noctis-logo.png" className="h-8"/>
          {
            /*
          <div>
            <button className="text-left font-semibold flex-row items-center flex gap-x-10 hover:bg-neutral-900 transition-all duration-300 px-3 py-4 rounded-md">
              Events
              <PartyPopper className="size-4" />
            </button>
          </div>
          */
          }
        </div>
        <div className="flex flex-col gap-y-2">
          <Separator />
          <div>
            <Button variant="ghost" onClick={handleSignout}><LogOut /></Button>
          </div>
        </div>
      </aside>
    </>
  )
}
