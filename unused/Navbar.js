const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>ExamBank.AI</h1>
            <div className="links">
                <Link to="/">Show Content</Link>
                <Link to="/create">Show Exam</Link>
                <Link to="/" name='login'
                style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>About</Link>
            </div>
        </nav>
    );
}

export default Navbar;