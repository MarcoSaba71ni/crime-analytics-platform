import { Link } from "react-router-dom";
import { AlertTriangle, Hammer, ArrowLeft } from "lucide-react";

function UnderConstruction({
    title = "Under Construction",
    message = "This section is currently being built. Please check back soon for updates.",
    eta = "Coming soon",
    showHomeButton = true,
    showBackButton = false,
    backTo = -1,
    onBack,
}) {
    function handleBackClick() {
        if (typeof onBack === "function") {
            onBack(backTo);
        }
    }

    return (
        <section className="relative min-h-[70vh] w-full overflow-hidden rounded-2xl bg-[var(--color-primary)] text-white ">

            <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-5 px-6 py-14 text-center sm:px-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)]/50 bg-[var(--color-secondary)]/15 px-4 py-1.5 text-xs font-redwing tracking-[0.18em] text-[var(--color-secondary)]">
                    <Hammer size={14} />
                    WORK IN PROGRESS
                </span>

                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <AlertTriangle size={28} className="text-[var(--color-secondary)]" />
                </div>

                <h1 className="font-redwing text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h1>
                <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{message}</p>

                <p className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs tracking-[0.14em] text-white/70 sm:text-sm">
                    {eta}
                </p>

                {(showHomeButton || showBackButton) && (
                    <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                        {showHomeButton && (
                            <Link
                                to="/"
                                className="w-full rounded-lg bg-[var(--color-secondary)] px-5 py-2.5 text-center font-redwing text-[var(--color-primary)] transition-colors duration-300 hover:bg-white sm:w-auto"
                            >
                                BACK TO HOME
                            </Link>
                        )}
                        {showBackButton && (
                            <button
                                type="button"
                                onClick={handleBackClick}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 font-redwing text-white transition-colors duration-300 hover:bg-white/10 sm:w-auto"
                            >
                                <ArrowLeft size={16} />
                                GO BACK
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default UnderConstruction;