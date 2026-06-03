import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets"
import  Loading  from "../Components/Loading";
import PayslipList from "../Components/payslip/PayslipList";
import GeneratePaySlipForm from "../Components/payslip/GeneratePaySlipForm";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

const PaySlips = () => {
  const { user } = useAuth()
  const [paySlips, setPayslips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const isAdmin = user?.role === "ADMIN"

  const fetchPaySlips = useCallback(async () => {
    try {
      const res = await api.get("/payslips");

      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaySlips()
  },[fetchPaySlips])

  useEffect(() => {
    if (isAdmin) api.get("/employees").then((res) =>setEmployees(res.data.filter((e)=>!e.isDeleted))).catch(()=>{})
  },[isAdmin])

  if(loading) return <Loading />

  return (
    <div className="animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div className="">

          <h1 className="page-title">
            Payslips
          </h1>

          <p className="page-subtitle">
             {isAdmin ? "Generate & Manage Employee Payslips" : "Your Payslips history"}
          </p>

        </div>

        {isAdmin && <GeneratePaySlipForm employees={employees} onSuccess={fetchPaySlips} />}

      </div>

      <PayslipList payslips={paySlips} isAdmin={isAdmin} />
      
    </div>
  )
}

export default PaySlips
