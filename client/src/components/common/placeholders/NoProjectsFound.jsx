const NoProjectsFound = ({message= "No projects found"}) => {
  return (
    <div className="flex items-center justify-center h-screen w-[calc(100vw-300px)]">
        <h5 className="text-xl font-semibold text-gray-600">
          {message}
        </h5>
      </div>
  )
}
export default NoProjectsFound