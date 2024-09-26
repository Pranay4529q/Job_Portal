// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState([]);
//   useEffect(() => {
//     fetch(`http://localhost:3000/all-jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setJob(data));
//   }, []);

//   const handleApply = async () => {
//     const { value: url } = await Swal.fire({
//       input: "url",
//       inputLabel: "URL address",
//       inputPlaceholder: "Enter the URL",
//     });
//     if (url) {
//       Swal.fire(`Entered URL: ${url}`);
//     }
//   };
//   // console.log(id);
//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
//       <h2>JobDetails:{id}</h2>
//       <h1>{job.jobTitle}</h1>
//       <button className="bg-blue px-8 py-2 text-white" onClick={handleApply}>
//         Apply Now
//       </button>
//     </div>
//   );
// };

// export default JobDetails;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const JobDetails = () => {
//   const { id } = useParams();
//   // console.log(id);
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/all-jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setJob(data));
//   }, [id]);

//   const handleApply = async () => {
//     const { value: url } = await Swal.fire({
//       input: "url",
//       inputLabel: "URL address",
//       inputPlaceholder: "Enter the URL",
//     });
//     if (url) {
//       Swal.fire(`Entered URL: ${url}`);
//     }
//   };

//   if (!job) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
//       <div className="pt-8">
//         <div className="flex flex-col items-start">
//           <div>
//             <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
//             <p className="text-xl text-gray-500">{job.employmentType}</p>
//           </div>
//           <button
//             className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//             onClick={handleApply}
//           >
//             Apply Now
//           </button>
//         </div>
//         <div className="flex mt-8">
//           <div className="w-1/2 pr-4">
//             <p>
//               <strong>Location:</strong> {job.jobLocation}
//             </p>
//             <p>
//               <strong>Salary:</strong> ${job.minPrice} - ${job.maxPrice}
//             </p>

//             <p>
//               <strong>Skills:</strong>
//               {Array.isArray(job.skills) && job.skills.length > 0
//                 ? job.skills.map((skill) => skill.value).join(", ")
//                 : "N/A"}
//             </p>

//             <p>
//               <strong>Posting Date:</strong>{" "}
//               {job.postingDate
//                 ? new Date(job.postingDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//             <p>
//               <strong>Benefits:</strong>{" "}
//               {job.benefits ? job.benefits.join(", ") : "N/A"}
//             </p>
//           </div>
//           <div className="w-1/2 pl-4">
//             <h2 className="text-2xl font-bold mb-4">Job Description</h2>
//             <div className="flex">
//               <div className="w-1/2 pr-2">
//                 <p>{job.description}</p>
//                 {/* <p>
//                   Fusce nec tellus sed augue semper porta. Mauris massa.
//                   Vestibulum lacinia arcu eget nulla. Class aptent taciti
//                   sociosqu ad litora torquent per conubia nostra, per inceptos
//                   himenaeos.
//                 </p>
//                 <p>
//                   Curabitur sodales ligula in libero. Sed dignissim lacinia
//                   nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In
//                   scelerisque sem at dolor.
//                 </p> */}
//               </div>
//               <div className="w-1/2 pl-2">
//                 {/* <p>
//                   Maecenas mattis. Sed convallis tristique sem. Proin ut ligula
//                   vel nunc egestas porttitor. Morbi lectus risus, iaculis vel,
//                   suscipit quis, luctus non, massa. Fusce ac turpis quis ligula
//                   lacinia aliquet. Mauris ipsum.
//                 </p>
//                 <p>
//                   Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in,
//                   nibh. Quisque volutpat condimentum velit. Class aptent taciti
//                   sociosqu ad litora torquent per conubia nostra, per inceptos
//                   himenaeos.
//                 </p>
//                 <p>
//                   Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor
//                   neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla
//                   facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a
//                   tellus consequat imperdiet.
//                 </p> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <footer className="mt-12 border-t pt-4">
//           <div className="flex justify-between">
//             <div>
//               <h3 className="font-bold">Company Name</h3>
//               <p>Address Line 1</p>
//               <p>Address Line 2</p>
//             </div>
//             <div>
//               <h3 className="font-bold">Contact Us</h3>
//               <p>Email: contact@example.com</p>
//               <p>Phone: (123) 456-7890</p>
//             </div>
//             <div>
//               <h3 className="font-bold">Follow Us</h3>
//               <p>Facebook | Twitter | LinkedIn</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Job Title and Apply Button */}
      <div className="pt-8">
        <div className="flex flex-col items-start">
          <div>
            <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
            <p className="text-xl text-gray-500">{job.employmentType}</p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>

        {/* Job Details Section */}
        <div className="flex mt-8">
          {/* Left Column with Job Info */}
          <div className="w-1/2 pr-4">
            <p>
              <strong>Company:</strong> {job.companyName}
            </p>
            <p>
              <strong>Location:</strong> {job.jobLocation}
            </p>
            <p>
              <strong>Salary:</strong> ${job.minPrice} - ${job.maxPrice} per{" "}
              {job.salaryType}
            </p>
            <p>
              <strong>Experience Level:</strong> {job.experienceLevel}
            </p>
            <p>
              <strong>Skills:</strong>
              {Array.isArray(job.skills) && job.skills.length > 0
                ? job.skills.map((skill) => skill.value).join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Posting Date:</strong>
              {job.postingDate
                ? new Date(job.postingDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Benefits:</strong>{" "}
              {job.benefits ? job.benefits.join(", ") : "N/A"}
            </p>
          </div>

          {/* Right Column with Logo and Contact Info */}
          <div className="w-1/2 pl-4 flex flex-col items-center">
            <img
              src={job.companyLogo}
              alt="Company Logo"
              className="h-32 w-32 object-cover mb-4"
            />
            <p className="text-center text-lg font-semibold">
              {job.companyName}
            </p>
            <p className="text-center text-gray-500 mb-4">{job.jobLocation}</p>
            <div className="border p-4 rounded shadow-lg">
              <h3 className="font-bold text-lg">Contact Information</h3>
              <p>Email: {job.postedBy}</p>
              <p>Phone: (Add phone number if available)</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold">Company Information</h3>
              <p>{job.companyName}</p>
              <p>Headquarters: {job.jobLocation}</p>
            </div>
            <div>
              <h3 className="font-bold">Contact Us</h3>
              <p>Email: {job.postedBy}</p>
              <p>Phone: (Add phone number)</p>
            </div>
            <div>
              <h3 className="font-bold">Follow Us</h3>
              <p>Facebook | Twitter | LinkedIn</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default JobDetails;
