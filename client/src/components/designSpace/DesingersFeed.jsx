import { useEffect, useState } from "react"
import axiosInstance from "../../apis/axiosIntance"
import DesingerItem from "./DesingerItem"

const DesingersFeed = () => {
const [designers, setDesigners] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(()=>{
   (
    async () => {
      try {
       setIsLoading(true)
      const response = await axiosInstance.get('designer/all')
      console.log(response)
      setDesigners(response.data)
      } catch (error) {
        setError(error.response.data.messege)
      }finally{
       setIsLoading(false)
      }
    }
   )()
},[])

if(isLoading) return (
  <div>
    <h4>loading ......</h4>
  </div>
)
if(error) return (
  <div>
    <h4>{error}</h4>
  </div>
)

  return (
  <div className="flex w-full bg-green-300">
    {
      designers.map((designer, index)=>{
        return <DesingerItem key={designer._id || index} {...designer}/>
      })
    }
  </div>
  )
}
export default DesingersFeed