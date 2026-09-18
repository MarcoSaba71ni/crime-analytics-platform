import PrimaryForm from "../components/profile-completion/primary-form";
import bgVideo from "../../images/video-tunelbana.webm";
import { ChevronRight } from 'lucide-react'

function ProfileCompletion() {
    return (
        <div className="min-h-screen">
            <video
                className="fixed inset-0 -z-20 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src={bgVideo}
            />
            <div className="fixed inset-0 -z-10 bg-[var(--color-primary)]/50" />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">

                {/* SS branding mark */}
                <p className="font-redwing text-3xl text-white line-through mb-8 tracking-widest">SS</p>

                {/* Card */}
                <div className="w-full max-w-md rounded-xl border border-white/20 bg-[rgba(15,23,42,0.72)] p-6 shadow-xl sm:p-8">
                    <h2 className="font-redwing text-2xl font-bold text-white tracking-wide text-center">
                        Profile Completion
                    </h2>
                    <p className="text-center text-white/70 text-sm mt-1 mb-6">
                        Complete your profile to access all features
                    </p>
                    <PrimaryForm />
                    <button
                        type="button"
                        className="mt-4 w-full bg-[var(--color-secondary)] text-black px-4 py-2.5 rounded font-semibold font-redwing hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
                    >
                        Next <span><ChevronRight className="inline-block ml-2" /></span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProfileCompletion;
