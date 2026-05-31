import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import CrimePerUserRole from "../components/CrimePerUserRole";

function ProfilePage() {

    const [ loading, setLoading ] = useState(false);
    const [, setError] = useState(null);
    const { user , token } = useAuth();
    const userId = user?.id;
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedBio, setUpdatedBio] = useState("");
    const [updateError, setUpdateError] = useState(null);
    const [updatedLoading, setUpdatedLoading] = useState(false);


    useEffect(() => {
        async function fetchUserData() {
            setLoading(true);
            if (!userId) {
                setLoading(false);
                return;
            }   

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const profileData = await response.json();
                console.log('Profile data:', profileData);                
                setProfileData(profileData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };
        fetchUserData();
        }, [userId, token]);

        async function handleProfileUpdate(e) {
            e.preventDefault();
            setUpdateError(null);

            // Add logic to update the profile here
            const updatedProfile = {
                username: updatedUsername,
                email: updatedEmail,
                bio: updatedBio
            };
            setUpdatedLoading(true);
            if (!updatedProfile.username || !updatedProfile.email) {
                setUpdateError('email and username fields are required');
                setUpdatedLoading(false);
                return;
            }
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedProfile)
                });
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }

                const updatedData = await response.json();
                setProfileData(updatedData);
                setIsEditing(false);
            } catch (err) {
                setUpdateError(err.message);
            } finally {
                setUpdatedLoading(false);
            }
            // You can use the updatedUsername, updatedEmail, and updatedBio state variables
        }

    return (
        <div>
            {loading && (
                <div className="min-h-screen bg-[var(--color-secondary)]/20 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin text-black" />
                        <p className="text-white font-redwing tracking-widest">LOADING...</p>
                    </div>
                </div>
            )}
            <div className="w-full min-h-screen flex flex-col bg-[var(--color-secondary)]">
                <div className="flex w-full flex-col items-stretch justify-center gap-6 px-4 pt-24 pb-10 sm:px-6 lg:flex-row lg:items-start lg:px-10">
                    <div className="w-full rounded-md bg-[var(--color-primary)] overflow-hidden lg:basis-1/3 lg:shrink-0 lg:self-start">
                        <div>
                            <h1 className="text-white text-xl sm:text-2xl font-bold p-4">Profile Information:</h1>
                        </div>
                        {!isEditing && (
                        <div className="flex flex-col mx-4 mt-2 mb-4 p-4 rounded-lg border border-white/10 bg-white/5 gap-4 sm:mt-4">
                            <div className="space-y-1">
                                <h3 className="text-xs tracking-widest text-gray-300">USERNAME</h3>
                                <p className="text-base font-redwing text-white break-words">{profileData?.username || "-"}</p>
                            </div>
                            <div className="w-full border border-white/15"/>
                            <div className="space-y-1">
                                <h3 className="text-xs tracking-widest text-gray-300">EMAIL</h3>
                                <p className="text-base font-redwing text-white break-all">{profileData?.email || "-"}</p>
                            </div>
                            <div className="w-full border border-white/15"/>
                            <div className="space-y-1">
                                <h3 className="text-xs tracking-widest text-gray-300">BIO</h3>
                                <p className="text-sm font-redwing text-gray-200 leading-relaxed break-words">{profileData?.bio || "No bio added yet."}</p>
                            </div>
                            <button
                            onClick={() => {
                                setUpdateError(null);
                                setIsEditing(true), 
                                setUpdatedUsername(profileData?.username || ""),
                                setUpdatedEmail(profileData?.email || ""),
                                setUpdatedBio(profileData?.bio || "")
                                }}
                             className="cursor-pointer mt-2 w-full sm:w-auto px-4 py-2 text-sm font-semibold bg-white text-black rounded-md self-stretch sm:self-end hover:bg-gray-200 transition-colors">UPDATE PROFILE</button>
                        </div>
                        )}
                        {isEditing && (
                            <form
                            onSubmit={handleProfileUpdate} className="flex flex-col mx-4 mt-2 mb-4 p-4 rounded-lg border border-white/10 bg-white/5 gap-4 sm:mt-4" >
                                <div>
                                    <h3 className="text-white text-sm font-semibold">Edit profile details</h3>
                                    <p className="text-xs text-gray-300 mt-1">Update your information below and save when ready.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">USERNAME</label>
                                    <input type="text" className="w-full h-10 px-3 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} placeholder="Enter username" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">EMAIL</label>
                                    <input type="email" className="w-full h-10 px-3 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} placeholder="Enter email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">BIO</label>
                                    <textarea className="w-full min-h-24 px-3 py-2 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70 resize-y" value={updatedBio} onChange={(e) => setUpdatedBio(e.target.value)} rows="4" placeholder="Write a short bio" />
                                </div>
                                {updateError && (
                                    <p className="text-red-500 text-sm">{updateError}</p>)}
                                <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUpdateError(null);
                                            setIsEditing(false);
                                        }}
                                        className="cursor-pointer w-full sm:w-auto px-4 py-2 text-sm font-semibold border border-white/40 text-white rounded-md hover:bg-white/10 transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        className={`cursor-pointer w-full sm:w-auto px-4 py-2 text-sm font-semibold bg-white text-black rounded-md hover:bg-gray-200 transition-colors ${updatedLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={updatedLoading}
                                    >
                                        {updatedLoading ? 'SAVING...' : 'SAVE CHANGES'}
                                    </button>
                                </div>
                            </form>)}
                    </div>
                    <div className="w-full min-w-0 lg:basis-2/3">
                        <CrimePerUserRole />
                    </div>
                </div>
            </div>            
        </div>

    )
}
export default ProfilePage;