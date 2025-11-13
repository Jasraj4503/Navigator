import { useEffect, useState } from "react";
import "../assets/css/Table.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const Home = () => {
    const [user, setUser] = useState([]);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    // Fetch all users
    async function fetchData() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Delete user
    async function trash(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/user/${id}`);
                Swal.fire("Deleted!", "User has been deleted.", "success");
                fetchData();
            }
        });
    }

    // Fetch single user for edit
    async function SingleUser(id) {
        setEditId(id);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);
            reset(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    // Update user
    async function editUser(data) {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/user/${editId}`, data);
            Swal.fire({
                title: "Updated!",
                text: "User updated successfully!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            fetchData();
            reset();
            
            document.querySelector("#exampleModal .btn-close").click();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="table-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="gradient-text">User Management</h2>
                    <p className="text-muted">Manage all users, edit info, or view details.</p>
                </div>

                <div className="table-responsive shadow-sm rounded-4">
                    <table className="table table-hover align-middle">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.length > 0 ? (
                                user.map((u, index) => (
                                    <tr key={index}>
                                        <td className="fw-semibold">{index + 1}</td>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                        <td>{u.mobile}</td>
                                        <td>{u.city}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => trash(u.id)}
                                                className="btn btn-outline-danger btn-sm me-2"
                                                title="Delete"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                            <button
                                                className="btn btn-outline-warning btn-sm me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => SingleUser(u.id)}
                                                title="Edit"
                                            >
                                                <FaUserEdit />
                                            </button>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => navigate(`/single-user/${u.id}`)}
                                                title="View"
                                            >
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Edit */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                data-bs-backdrop="static"
            >
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow-lg border-0">
                        <div className="modal-header bg-primary text-white">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit User
                            </h1>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(editUser)}>
                                <label className="form-label">User Name</label>
                                <input
                                    {...register("username")}
                                    className="form-control mb-3"
                                    placeholder="Enter name"
                                />

                                <label className="form-label">Email</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Enter email"
                                />

                                <label className="form-label">Phone</label>
                                <input
                                    {...register("mobile")}
                                    type="number"
                                    className="form-control mb-3"
                                    placeholder="Enter phone"
                                />

                                <label className="form-label">City</label>
                                <input
                                    {...register("city")}
                                    className="form-control mb-3"
                                    placeholder="Enter city"
                                />

                                <button className="btn btn-primary w-100 mt-2">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
