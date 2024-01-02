import { Button } from "@/components/ui/button"
import { MdOutlineDashboard } from "react-icons/md";

interface SidebarLink extends React.HTMLAttributes<HTMLDivElement> {
    variant: "default" | "ghost" | "destructive" | "secondary" | "outline" | "link"
}

function SidebarLink({ variant }: SidebarLink) {
    return (
        <Button variant={variant} className="w-full justify-start">
            <div className="mr-2">
                {MdOutlineDashboard}
            </div>
            Listen Now
        </Button>
    )
}

export default SidebarLink