import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userdata, setUserdata] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/read");
      const data = await response.json();
      // State for showing/hiding the input fields
      setUserdata(data);
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: any) => {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.status;
      console.log('status',data);
    } else {
      console.log("No content");
    }
  };

  const handleEdit = (id: any) => {
    setIsEditing(true); // Show the dialog when the Edit button is clicked
    setSelectedId(id); // Store the selected user id
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/edit/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, job }), // Send name and job in the request body
      });

      const data = await response.json(); 
      const status = await response.status;

      console.log(data); // Log the data to the console
      console.log("status" ,status);

      setIsEditing(false); // Close the dialog after submitting the form
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {userdata &&
              userdata.map((user) => (
                <div key={user.id} className=" group-[]: relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={user.avatar}
                      alt={user.avatar}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {user.email}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.id}
                    </p>
                  </div>

                  <Button
                    className="text-sm font-medium text-gray-900"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>

                  <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To edit this user, please enter the new name and job.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        margin="dense"
                        id="job"
                        label="Job"
                        type="text"
                        fullWidth
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                  <Button
                    className="text-sm font-medium text-gray-900"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
