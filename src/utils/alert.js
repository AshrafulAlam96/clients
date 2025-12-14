import Swal from "sweetalert2";

/* SUCCESS ALERT */
export const successAlert = (title, text = "") => {
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 2000,
    showConfirmButton: false
  });
};

/* ERROR ALERT */
export const errorAlert = (title, text = "") => {
  Swal.fire({
    icon: "error",
    title,
    text
  });
};

/* CONFIRM ALERT */
export const confirmAlert = async (
  title = "Are you sure?",
  text = "This action cannot be undone!"
) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });
};
