import { Home, Projector } from "lucide-react"
import { SidebarProvider } from "../../context/SidebarProvider"
import SidebarItem from "../common/SidebarItem"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <SidebarProvider >
       <SidebarItem icon={<Projector />} text="Projects" to="pending-projects"/>
       <SidebarItem />
       <SidebarItem />
       <SidebarItem />
    </SidebarProvider>
  )
}
export default Sidebar