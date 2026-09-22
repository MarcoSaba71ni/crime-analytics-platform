import { useState, useRef } from 'react';

const inputClass = "w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition";

function TertiaryForm() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <form className="flex flex-col gap-5 bg-[var(--color-secondary)]/50 rounded-lg p-4">

            <p className="font-redwing text-white/60 text-xs tracking-widest uppercase">Your Profile</p>

            {/* Profile Picture */}
            <div className="flex flex-col gap-2">
                <label className="text-white font-redwing">Profile Picture</label>
                <div className="flex items-center gap-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="h-16 w-16 shrink-0 rounded-full border-2 border-[var(--color-secondary)]/50 bg-[rgba(15,23,42,0.5)] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[var(--color-secondary)] transition"
                    >
                        {preview ? (
                            <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-white/30 text-2xl font-light">+</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm text-[var(--color-secondary)] hover:underline cursor-pointer text-left"
                        >
                            Upload photo
                        </button>
                        <p className="text-white/40 text-xs">JPG, PNG or WebP · Max 2 MB</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <hr className="border-white/10" />

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
                <label className="text-white font-redwing" htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="+46 70 000 00 00"
                    className={inputClass}
                />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
                <label className="text-white font-redwing" htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell us a bit about yourself..."
                    className={inputClass + " resize-none"}
                />
            </div>

        </form>
    );
}

export default TertiaryForm;
