function Header () {
    return (
        <header className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-12 bg-transparent">
            <div className="bg-transparent">
                <h1 className="text-4xl text-white line-through">SS</h1>
            </div>
            <nav
                className="px-12 py-3 rounded-b-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
            >
                <ul className="flex gap-12">
                    <li className="text-lg text-white">Home</li>
                    <li className="text-lg text-white">Methodology</li>
                    <li className="text-lg text-white">Who We Are</li>
                    <li className="text-lg text-white">Crime History</li>
                    <li className="text-lg text-white">Zones</li>
                </ul>
            </nav>
            <div className="bg-transparent">
                <button
                    className="header_button text-white px-4 py-2 rounded"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                >
                    Login
                </button>
            </div>
        </header>
    )
}

export default Header
