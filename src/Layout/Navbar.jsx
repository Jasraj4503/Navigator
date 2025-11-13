import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserPlus, FaHome } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";   // ✅ Bootstrap first
import "../assets/css/Navbar.css";                // ✅ Your custom styles next

const Navbar = () => {
    const navigate = useNavigate();

    const handleAddUserClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Add New User",
            text: "Ready to add a new user?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Add User!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/addUser");
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm sticky-top py-3">
            <div className="container-fluid px-4">
                <Link className="navbar-brand fw-bold text-white fs-4" to="/">
                    <span className="logo-icon me-2">👥</span> User Management
                </Link>

                <button
                    className="navbar-toggler border-0 text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-semibold" to="/">
                                <FaHome className="me-1" /> Home
                            </Link>
                        </li>
                    </ul>

                    <button
                        onClick={handleAddUserClick}
                        className="btn btn-light text-primary fw-semibold d-flex align-items-center gap-2 px-3"
                    >
                        <FaUserPlus /> Add User
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
