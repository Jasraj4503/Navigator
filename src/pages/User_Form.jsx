import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

const User_Form = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const addData = async (data) => {
        try {
            if (!id) {
                await axios.post(`${import.meta.env.VITE_API_URL}/user`, data);
                Swal.fire({
                    title: "Success!",
                    text: "User added successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => navigate("/"));
            } else {
                await axios.put(`${import.meta.env.VITE_API_URL}/user/${id}`, data);
                Swal.fire({
                    title: "Success!",
                    text: "User updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => navigate("/"));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const SingleUser = async () => {
        if (id) {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);
            reset(res.data);
        }
    };

    useEffect(() => {
        if (id) SingleUser();
    }, [id, reset]);

    return (
        <div className="col-lg-6 m-auto mt-5 shadow p-5 rounded-3 modern-form glass-effect">
            <h1 className="text-capitalize text-center mb-4 gradient-text">
                {id ? "Edit User" : "Add User"}
            </h1>
            <form onSubmit={handleSubmit(addData)}>
                <label className="form-label mb-2">User Name</label>
                <input {...register("username")} className="form-control mb-2" placeholder="Enter name" />

                <label className="form-label mb-2">Email</label>
                <input {...register("email")} type="email" className="form-control mb-2" placeholder="Enter email" />

                <label className="form-label mb-2">Phone</label>
                <input {...register("mobile")} type="number" className="form-control mb-2" placeholder="Enter phone" />

                <label className="form-label mb-2">City</label>
                <input {...register("city")} className="form-control mb-2" placeholder="Enter city" />

                <button
                    className={`btn ${id ? "btn-warning" : "btn-primary"} w-100 text-capitalize my-3`}
                >
                    {id ? "Update User" : "Add User"}
                </button>
            </form>
        </div>
    );
};

export default User_Form;
