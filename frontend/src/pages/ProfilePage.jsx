import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CrimeLocationMap from "../components/CrimeLocationMap";

function truncateText(text, limit) {
    if (!text) return "";
    if (text.length <= limit) return text;
    return `${text.slice(0, limit).trim()}...`;
}

function ProfilePage() {

    const [ loading, setLoading ] = useState(false);
    const [, setError] = useState(null);
    const { user , token } = useAuth();
    const userId = user?.id;
    const role = user?.role;
    console.log('User ID:', userId);
    console.log('User Role:', role);
    const [profileData, setProfileData] = useState(null);
    const savedCrimes = useSelector((state) => state.saved.savedCrimes);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            setLoading(true);
            if (!userId) return;
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

    return (
        <div>
            {loading && (
                <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin text-black" />
                        <p className="text-white font-redwing tracking-widest">LOADING...</p>
                    </div>
                </div>
            )}
            <div className="w-full flex flex-col bg-[var(--color-secondary)]">
                <div className="flex justify-center items-start w-full mt-25 mb-10">
                    <div className="w-1/3 h-auto self-start rounded-md bg-[var(--color-primary)] mx-20 overflow-hidden">
                        <div>
                            <img src="../../images/burning-bus.jpg" alt="Profile" 
                            className="w-full"/>
                        </div>
                        {!isEditing && (
                        <div className="flex flex-col mx-4 mt-4 p-4 rounded-lg border border-white/10 bg-white/5 gap-4">
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
                            onClick={() => setIsEditing(true)}
                             className="cursor-pointer mt-2 px-4 py-2 text-sm font-semibold bg-white text-black rounded-md self-end hover:bg-gray-200 transition-colors">UPDATE PROFILE</button>
                        </div>
                        )}
                        {isEditing && (
                            <form className="flex flex-col mx-4 mt-4 p-4 rounded-lg border border-white/10 bg-white/5 gap-4" >
                                <div>
                                    <h3 className="text-white text-sm font-semibold">Edit profile details</h3>
                                    <p className="text-xs text-gray-300 mt-1">Update your information below and save when ready.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">USERNAME</label>
                                    <input type="text" className="w-full h-10 px-3 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70" placeholder="Enter username" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">EMAIL</label>
                                    <input type="email" className="w-full h-10 px-3 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70" placeholder="Enter email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-300">BIO</label>
                                    <textarea className="w-full min-h-24 px-3 py-2 rounded-md bg-gray-200/95 text-black text-sm font-redwing outline-none focus:ring-2 focus:ring-white/70 resize-y" rows="4" placeholder="Write a short bio" />
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="cursor-pointer px-4 py-2 text-sm font-semibold border border-white/40 text-white rounded-md hover:bg-white/10 transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-4 py-2 text-sm font-semibold bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        SAVE CHANGES
                                    </button>
                                </div>
                            </form>)}
                    </div>
                    {role === "analyst" && (
                        <div className="w-2/3 flex flex-col items-start justify-start">
                            <h2 className="text-3xl font-bold  mt-4 text-white text-start items-top">SAVED LIST</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4 w-full">
                                {savedCrimes.map((crime) => (
                                    <div key={crime.id} className="w-full bg-[var(--color-primary)] rounded-md p-4 mt-4 flex flex-col items-start text-left">
                                        <div className="w-full">
                                            {crime.latitude && crime.longitude ? (
                                                <div className="w-full h-40 mb-4">
                                                    <CrimeLocationMap lat={crime.latitude} lng={crime.longitude} />
                                                </div>
                                            ) : null}
                                            <Link to={`/crime-page?id=${crime.id}`}>
                                                <h3 className="text-md font-redwing text-white leading-snug break-words">
                                                    {truncateText(crime.title, 55)}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-white leading-relaxed break-words mt-2">
                                                {truncateText(crime.description, 150)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {savedCrimes.length === 0 && (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full min-h-56 flex items-center justify-center text-center mt-4">
                                        <p className="text-lg font-redwing text-white">No saved crimes yet.</p>
                                    </div>
                                )}                                
                            </div>

                        </div>
                    )}
                    {role === "crime_reporter" && (
                        <div className="w-2/3 flex flex-col items-start justify-start">
                            <h2 className="text-3xl font-bold  mt-4 text-white text-start items-top">REPORTED CRIMES</h2>
                        </div>
                    )}
                </div>
            </div>            
        </div>

    )
}
export default ProfilePage;