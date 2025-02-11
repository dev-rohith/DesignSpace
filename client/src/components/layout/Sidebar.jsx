import { ContactRound, FileUser, MessageCircle, SquareChartGantt, SquareKanban } from "lucide-react"
import { SidebarProvider } from "../../context/SidebarProvider"
import SidebarItem from "../common/SidebarItem"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Sidebar = () => {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)
  return (
    <SidebarProvider >
      {(!user || user.role === 'client') && <SidebarItem icon={<ContactRound />} text="desingers" to="designers"/>}
      {(!user || user.role === 'client') && <SidebarItem icon={<SquareChartGantt />} text="Projects" to="pending-projects"/>}
      {user?.role === 'client' && <SidebarItem icon={<MessageCircle />} text="Projects" to="chat"/>}
      {/* {(!user || user.role === 'client') && <SidebarItem icon={<MessageCircle />} text="Projects" to="pending-projects"/>} */}

      {user?.role === 'client' && <SidebarItem icon={<SquareKanban />} text="Projects" to="pending-projects"/>}
    {user?.role === 'client' && <SidebarItem icon={<SquareKanban />} text="Projects" to="pending-projects"/>}
      {user?.role === 'client' && <SidebarItem icon={<SquareKanban />} text="Projects" to="pending-projects"/>}
      {user?.role === 'client' && <SidebarItem icon={<SquareKanban />} text="Projects" to="pending-projects"/>}


      {user?.role === 'admin' && <SidebarItem icon={<FileUser />} text="Applications" to=""/>}
    </SidebarProvider>
  )
}
export default Sidebar