import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useSelector } from "react-redux";

export default function RecentSales() {
    const { sales } = useSelector((state: any) => state.sale);

    return (
        <div className="space-y-8">
            {sales.map((item, index) => (

                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>

                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                        <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
            ))}

        </div>
    )
}
