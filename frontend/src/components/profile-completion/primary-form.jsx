const inputClass = "w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition";

function PrimaryForm() {
    return (
        <form className="bg-[var(--color-secondary)]/50 rounded-lg p-4">
            <div className="flex gap-4">
                {/* Column 1 — First Name + Last Name */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="first-name">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            placeholder="First name"
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="last-name">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            placeholder="Last name"
                            className={inputClass}
                        />
                    </div>
                </div>
                {/* Column 2 — Age + Genre */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Age"
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="genre">Genre</label>
                        <select id="genre" className={inputClass}>
                            <option value="">Select genre</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PrimaryForm;
