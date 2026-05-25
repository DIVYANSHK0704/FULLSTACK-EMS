import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData } from "../assets/assets"

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading,setLoading] = useState(true)

  const fetchEmployees = useCallback(async (params) => {
    setLoading(true)
    setEmployees(dummyEmployeeData)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  },[])

  useEffect(() => {
    fetchEmployees();
  },[])

  return (
    <div className="animate fade-in">
         
      {/* Header */}
      <div className="">
        
      </div>

      {/*search bar*/}

      {/*employee card*/}
    </div>
  )
}

export default Employees
