import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Save the contact in local database
      await axios.post("http://localhost:5000/api/saveContact", data);

      // Save the contact in HubSpot CRM
      await axios.post("http://localhost:5000/api/saveContactToHubSpot", data);

      // Redirect to the thank you page
      window.location.href = "/thank-you";
    } catch (error) {
      // Redirect to the decline page
      window.location.href = "/decline";
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Contact Form</h2>

        <div>
          <label>Email</label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <span className="error">Please enter a valid email</span>
          )}
        </div>

        <div>
          <label>First Name</label>
          <input {...register("firstName", { required: true })} />
          {errors.firstName && (
            <span className="error">Please enter your first name</span>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input {...register("lastName", { required: true })} />
          {errors.lastName && (
            <span className="error">Please enter your last name</span>
          )}
        </div>

        <div>
          <label>Contact Owner</label>
          <select {...register("contactOwner", { required: true })}>
            <option value="Agent 1">Agent 1</option>
            <option value="Agent 2">Agent 2</option>
            <option value="Agent 3">Agent 3</option>
          </select>
          {errors.contactOwner && (
            <span className="error">Please select a contact owner</span>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <input {...register("phoneNumber", { required: true })} />
          {errors.phoneNumber && (
            <span className="error">Please enter your phone number</span>
          )}
        </div>

        <div>
          <label>Job Title</label>
          <input {...register("jobTitle")} />
        </div>

        <div>
          <label>Stage</label>
          <select {...register("stage", { required: true })}>
            <option value="Lead">Lead</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Customer">Customer</option>
          </select>
          {errors.stage && <span className="error">Please select a stage</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
