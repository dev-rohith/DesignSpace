import { ContactRound, FileUser, MessageCircle, SquareChartGantt, SquareKanban, TestTubes, Users } from "lucide-react"
import { SidebarProvider } from "../../context/SidebarProvider"
import SidebarItem from "../common/SidebarItem"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Sidebar = () => {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)
  return (
    <SidebarProvider >
      {(!user || user.role === 'client') && <SidebarItem icon={<ContactRound />} text="desingers" to="/design-space/designers"/>}
      {(!user || user.role === 'client') && <SidebarItem icon={<MessageCircle />} text="mychat" to="/design-space/chat"/>}
      {(!user || user.role === 'client') && <SidebarItem icon={<SquareChartGantt />} text="Projects" to="/design-space/pending-projects"/>}



    {user?.role === 'client' && <SidebarItem icon={<SquareKanban />} text="Projects" to="/design-space/pending-projects"/>}
    


      {user?.role === 'admin' && <SidebarItem icon={<Users />} text="ManageUsers" to="/admin/manage-users"/>}
      {user?.role === 'admin' && <SidebarItem icon={<FileUser />} text="Applications" to="/admin/manage-applications"/>}
      {user?.role === 'admin' && <SidebarItem icon={<TestTubes />} text="dashbord" to="/admin/dashbord"/>}


    </SidebarProvider>
  )
}
export default Sidebar