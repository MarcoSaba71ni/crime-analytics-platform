function LoginForm ({ onClose }) {
    return (
        <form className="relative flex flex-col bg-[var(--color-secondary)] p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-20">

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close login form"
                    className="absolute cursor-pointer top-3 right-3 bg-[var(--color-primary)] text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors duration-300"
                >
                    X
                </button>

            <div className="mb-4 flex flex-col">
                <label className="font-redwing" 
                htmlFor="email">Email:</label>
                <input className="bg-[var(--color-primary)] p-2 pl-1 rounded text-white" type="email" id="email" name="email" />            
            </div>
            <div className="mb-4 flex flex-col">
                <label className="font-redwing"
                 htmlFor="password">Password:</label>
                <input className="bg-[var(--color-primary)] p-2 pl-1 rounded text-white" type="password" id="password" name="password" />
            </div>
            <button type="submit" className="bg-[var(--color-primary)] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">Login</button>
            <p className="mt-4 text-center text-sm text-[var(--color-primary)]">Don't have an account? <a href="/auth/register" className="underline">Register</a></p>
        </form>
    )
}
export default LoginForm