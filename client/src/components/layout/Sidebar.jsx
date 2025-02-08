import { Home, Projector } from "lucide-react"
import { SidebarProvider } from "../../context/SidebarProvider"
import SidebarItem from "../common/SidebarItem"

const Sidebar = () => {
  return (
    <SidebarProvider >
       <SidebarItem icon={<Home />} text="Home" to="designers"/>
       <SidebarItem icon={<Projector />} text="Projects" to="pending-projects"/>
       <SidebarItem />
       <SidebarItem />
       <SidebarItem />
    </SidebarProvider>
  )
}
export default Sidebar