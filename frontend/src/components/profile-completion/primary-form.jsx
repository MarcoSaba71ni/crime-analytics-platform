function PrimaryForm() {
    return (
        <form className="flex flex-col gap-4 bg-[var(--color-secondary)]/50 rounded-lg p-4">
            <div className="flex flex-col gap-1">
                <label className="text-white font-redwing" htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    id="first-name"
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-white font-redwing" htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="last-name"
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-white font-redwing" htmlFor="age">Age</label>
                <input
                    type="number"
                    id="age"
                    placeholder="Enter your age"
                    className="w-full rounded-lg border border-white/20 bg-[rgba(15,23,42,0.5)] p-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/60 transition"
                />
            </div>
        </form>
    );
}

export default PrimaryForm;
