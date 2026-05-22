import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";

function ProfilePage() {

    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const userId = user?.id;
    console.log('User ID:', userId);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/profiles/${userId}`);
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
        }, [userId]);

    return (
        <div className="w-full h-screen flex flex-col bg-[var(--color-secondary)]">
            <h1 className="text-4xl font-bold mt-25 mx-20 text-[var(--color-primary)]">My Profile</h1>
            <div>
                <div className="w-48 h-48 rounded-full bg-[var(--color-primary)]-300 mx-20 mt-10">
                    <div>
                        <img src="../../images/burning-bus.jpg" alt="Profile" 
                        className="w-full"/>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4 bg-[var(--color-primary)]-300 p-4 rounded">
                        <div>
                            <h2 className="text-2xl font-bold mt-4 text-center">USERNAME:</h2>
                            <p className="text-2xl font-bold mt-4 text-center">{profileData?.username}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mt-4 text-center">EMAIL:</h2>
                            <p className="text-2xl font-bold mt-4 text-center">{profileData?.email}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mt-4 text-center">BIO:</h2>
                            <p className="text-2xl font-bold mt-4 text-center">{profileData?.bio}</p>
                        </div>
                        <button className="mt-4 px-2 py-1 text-sm bg-white text-black rounded">UPDATE PROFILE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage;