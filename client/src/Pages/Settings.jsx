import { useEffect, useState } from "react"
import { dummyProfileData } from "../assets/assets"
import Loading from "../Components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../Components/ProfileForm";
import ChangePasswordModal from "../Components/ChangePasswordModal";

const Settings = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(()=>{
      setLoading(false)
    },1000);
  }

  useEffect(()=>{
    fetchProfile()
  },[])

  if (loading) return <Loading />
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>

        <p className="page-subtitle">Manage your account</p>
      </div>

      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

      {/* Change Password trigger */}
      <div className="card max-w-md p-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-3">

            <Lock className="w-5 h-5 text-slate-600" />

          </div>

          <div>
            <p className="font-medium text-slate-900">
              Password
            </p>
            <p className="text-sm text-slate-500">

              Update your account Password{" "}

            </p>

          </div>

        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="btn-secondary text-sm"
        >
          Change
        </button>

      </div>

      <ChangePasswordModal open={showPasswordModal} onClose={()=>setShowPasswordModal(false)} />

    </div>
  );
}

export default Settings
