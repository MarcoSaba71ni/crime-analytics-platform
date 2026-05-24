import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";

function ProfilePage() {

    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const { user , token } = useAuth();
    const userId = user?.id;
    const role = user?.role;
    console.log('User ID:', userId);
    console.log('User Role:', role);
    const [profileData, setProfileData] = useState(null);

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
            <div className="w-full h-screen flex flex-col bg-[var(--color-secondary)]">
                <div className="flex  justify-center w-full mt-25">
                    <div className="w-1/3 h-auto rounded-md bg-[var(--color-primary)] rounded-md  mx-20">
                        <div>
                            <img src="../../images/burning-bus.jpg" alt="Profile" 
                            className="w-full"/>
                        </div>
                        <div className="flex flex-col items-center justify-center mx-4 mt-4 bg-[var(--color-primary)]-300 p-4 rounded">
                            <div className="flex justify-between w-full">
                                <h2 className="text-2xl font-bold text-sm mt-4 text-white text-center">USERNAME:</h2>
                                <p className="text-2xl font-redwing text-sm mt-4 text-gray-400 text-center">{profileData?.username}</p>
                            </div>
                            <div className="w-full border mt-2 text-white"/>
                            <div className="flex justify-between w-full">
                                <h2 className="text-2xl font-bold text-sm mt-4 text-white text-center">EMAIL:</h2>
                                <p className="text-2xl font-redwing text-sm mt-4 text-gray-400 text-center">{profileData?.email}</p>
                            </div>
                            <div className="w-full border mt-2 text-white"/>
                            <div className="flex justify-between w-full">
                                <h2 className="text-2xl font-bold text-sm mt-4 text-white text-center">BIO:</h2>
                                <p className="text-2xl  font-redwing text-sm mt-4 text-gray-400 text-center">{profileData?.bio}</p>
                            </div>
                            <div className="w-full border mt-2 text-white"/>                        
                            <button className="cursor-pointer mt-4 px-2 py-1 text-sm bg-white text-black rounded">UPDATE PROFILE</button>
                        </div>
                    </div>
                    {role === "analyst" && (
                        <div className="w-2/3 flex flex-col items-start justify-start">
                            <h2 className="text-3xl font-bold  mt-4 text-white text-start items-top">SAVED LIST</h2>
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