import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";

const SingleUser = () => {
    const { id } = useParams();
    const [single, setSingle] = useState({});

    async function fetchSingleUser() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);
            setSingle(res.data);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }

    useEffect(() => {
        fetchSingleUser();
    }, [id]);

    return (
        <>
            <div className="container mt-5">
                <div className="glass-effect p-4 rounded-4 shadow-lg modern-single-card">

                    {/* Back Button */}
                    <Link to="/" className="text-decoration-none">
                        <button className="btn btn-outline-primary mb-4 d-flex align-items-center pulse-animation">
                            <IoArrowBack className="me-2 fs-5" /> Back to Users
                        </button>
                    </Link>

                    {/* User Profile Section */}
                    <div className="row g-4 align-items-center">
                        <div className="col-md-4 text-center">
                            <div className="user-avatar mx-auto mb-3">
                                <FaUserCircle className="text-primary" size={120} />
                            </div>
                            <h2 className="fw-bold gradient-text">{single.username}</h2>
                            <span className="badge bg-secondary fs-6 px-3 py-2">
                                User ID: {single.id}
                            </span>
                        </div>

                        <div className="col-md-8">
                            <div className="modern-card p-4 rounded-4 border shadow-sm">
                                <h4 className="fw-bold mb-3 text-primary">User Information</h4>
                                <hr />

                                <div className="info-section mb-3">
                                    <h6 className="text-muted">Email</h6>
                                    <p className="fs-5 d-flex align-items-center">
                                        <FaEnvelope className="me-2 text-primary" /> {single.email}
                                    </p>
                                </div>

                                <div className="info-section mb-3">
                                    <h6 className="text-muted">Phone</h6>
                                    <p className="fs-5 d-flex align-items-center">
                                        <FaPhoneAlt className="me-2 text-success" /> {single.mobile}
                                    </p>
                                </div>

                                <div className="info-section">
                                    <h6 className="text-muted">City</h6>
                                    <p className="fs-5 d-flex align-items-center">
                                        <FaMapMarkerAlt className="me-2 text-danger" /> {single.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SingleUser;
