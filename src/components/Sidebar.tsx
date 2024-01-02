import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MdOutlineDashboard, MdOutlineInventory } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { LiaReceiptSolid } from "react-icons/lia";
import { GiExpense } from "react-icons/gi";

import { NavLink } from "react-router-dom";
import { links } from "../data/dummy"
import { Item } from "@radix-ui/react-menubar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsFileBarGraph } from "react-icons/bs";
import logo from "../assets/Group-logo.jpg"

interface IconProps {
    name: string; // Assuming the icon names are strings, you can adjust this based on your actual icon data
}

const Icon: React.FC<IconProps> = ({ name }) => {
    // Map icon names to actual react-icons components
    const iconComponents: { [key: string]: JSX.Element } = {
        dashboard: <MdOutlineDashboard />,
        menu: <IoHomeOutline />,
        sales: <LiaReceiptSolid />,
        expenses: <GiExpense />,
        stock: <MdOutlineInventory />,
        // Add more icons as needed
    };

    // Render the corresponding icon or a default icon if not found
    const iconToRender = iconComponents[name.toLowerCase()] || <div>Icon not found</div>;

    return <div>{iconToRender}</div>;
};
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Sidebar({ className }: SidebarProps) {
    const useFindPath = () => {
        const location = useLocation();
        const [currentPath, setCurrentPath] = useState<string>();
        useEffect(() => {
            setCurrentPath(location.pathname);
        }, [location]);
        return currentPath;
    };

    // Usage:
    const path = useFindPath();
    console.log(path)
    return (
        <div className={cn("pb-12", className)}>
            <div className="mx-auto  flex items-center w-fit mt-8">
                <img src={logo} className="w-16 h-16 mr-2" alt="logo" />
                <div className=" flex items-start">
                    <p className="text-4xl mt-[-3px] pt-0 leading-9 text-primary">T</p>
                    <div className=" flex flex-col">
                        <p className="text-xs font-semi-extrabold">apex</p>
                        <p className="text-xs font-semi-extrabold">Hardware</p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Pages
                        </h2>
                        <div className="space-y-1">
                            {links.pages?.map((item: any, index: number) => (
                                <NavLink
                                    //  onClick={handleCloseSideBar}
                                    to={`/${item.link}`}
                                    key={index}
                                    style={({ isActive, isPending, isTransitioning }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isPending ? "red" : "black",
                                            viewTransitionName: isTransitioning ? "slide" : "",
                                        };
                                    }}
                                >

                                    <Button variant={path == `/${item.link}` ? "secondary" : "ghost"} className="w-full justify-start">
                                        <div className="mr-2">
                                            <Icon name={item.title} />
                                        </div>
                                        {item.title}
                                    </Button>
                                </NavLink>
                            ))}

                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Reports
                        </h2>
                        <div className="space-y-1">
                            <NavLink
                                to="report/sales"
                            >
                                <Button variant={path == '/report/sales' ? "secondary" : "ghost"} className="w-full justify-start">
                                    <div className="mr-2">
                                        <BsFileBarGraph />
                                    </div>
                                    Sales
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
