// import React, { useEffect } from "react";
// import Banner from "../components/Banner";
// import { useState } from "react";
// import Jobs from "./Jobs";
// import Card from "../components/Card";
// import Sidebar from "../sidebar/Sidebar";
// import NewsLetter from "../components/NewsLetter";
// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   //Loading effect
//   const [isLoading, setIsLoading] = useState(true);
//   //pagenation
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   //load the data
//   useEffect(() => {
//     setIsLoading(true);
//     // fetch("jobs.json")
//     fetch("http://localhost:3000/all-jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log(data);
//         setJobs(data);
//         setIsLoading(false);
//       });
//   }, []);
//   console.log(jobs);
//   //handle input change
//   const [query, setQuery] = useState("");
//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//     // console.log(event.target.value);
//   };
//   //filter jobs by title
//   const filteredItems = jobs.filter(
//     (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );
//   //console.log(filteredItems);
//   //-------Radio Filtering ----------------
//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };
//   ///---Button Filtering -----------
//   const handleClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   ///claculate the index range
//   const calculatePageRange = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return { startIndex, endIndex };
//   };

//   // Function for the next page
//   const nextPage = () => {
//     if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   ///function for previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   //main functions
//   // const filteredData = (jobs, selected, query) => {
//   //   let filteredJobs = jobs;
//   //   // if any query is given then jobs get selected according to our query
//   //   if (query) {
//   //     filteredJobs = filteredItems;
//   //   }
//   //   //category filtering
//   //   if (selected) {
//   //     filteredJobs = filteredJobs.filter(
//   //       ({
//   //         jobLocation,
//   //         maxPrice,
//   //         experienceLevel,
//   //         salaryType,
//   //         employmentType,
//   //         postingDate,
//   //       }) =>
//   //         jobLocation.toLowerCase() === selected.toLowerCase() ||
//   //         parseInt(maxPrice) === parseInt(selected) ||
//   //         //experienceLevel === selected ||
//   //         salaryType.toLowerCase() <= selected.toLowerCase() ||
//   //         employmentType.toLowerCase() === selected.toLowerCase()
//   //       // postingDate === selected
//   //     );
//   //   //  console.log(filteredJobs);
//   //   }

//   //   return filteredJobs.map((data, i) => <Card key={i} data={data} />);
//   // };

//   const filteredData = (jobs, selected, query) => {
//     let filteredJobs = jobs;

//     // Query filtering
//     if (query) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.jobTitle.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Category filtering
//     if (selected) {
//       filteredJobs = filteredJobs.filter((job) => {
//         const jobPostingDate = new Date(job.postingDate);
//         const selectedDate = new Date(selected);

//         return (
//           job.jobLocation.toLowerCase() === selected.toLowerCase() ||
//           parseInt(job.maxPrice) <= parseInt(selected) ||
//           job.salaryType.toLowerCase() === selected.toLowerCase() ||
//           jobPostingDate >= selectedDate ||
//           job.experienceLevel.toLowerCase() === selected.toLowerCase() ||
//           job.employmentType.toLowerCase() === selected.toLowerCase()
//         );
//       });
//     }

//     //slice the data based on currentpage
//     const { startIndex, endIndex } = calculatePageRange();
//     filteredJobs = filteredJobs.slice(startIndex, endIndex);
//     return filteredJobs.map((data, i) => <Card key={i} data={data} />);
//   };

//   const result = filteredData(jobs, selectedCategory, query);

//   return (
//     <div>
//       <Banner query={query} handleInputChange={handleInputChange} />
//       {/*Main Content */}
//       <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
//         {/*Left Side */}
//         <div className="bg-white p-4 rounded">
//           <Sidebar handleChange={handleChange} handleClick={handleClick} />
//         </div>
//         {/*Job Cards */}
//         <div className="col-span-2 bg-white p-4 rounded">
//           {isLoading ? (
//             <p className="font-medium">Loading...</p>
//           ) : result.length > 0 ? (
//             <Jobs result={result} />
//           ) : (
//             <>
//               <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
//               <p>No data found</p>
//             </>
//           )}

//           {/* Defining Pagenation*/}
//           {result.length > 0 ? (
//             <div className="flex justify-center mt-4 space-x-8">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="hover:underline"
//               >
//                 Previous
//               </button>
//               <span className="mx-2">
//                 Page {currentPage} of{" "}
//                 {Math.ceil(filteredItems.length / itemsPerPage)}
//               </span>
//               <button
//                 onClick={nextPage}
//                 disabled={
//                   currentPage === Math.ceil(filteredItems.length / itemsPerPage)
//                 }
//                 className="hover:underline"
//               >
//                 Next
//               </button>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//         {/* Right side */}
//         <div className="bg-white p-4 rounded">
//           <NewsLetter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState("");
  ///loading data from the backend with below api
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      //  fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);
  //on search bar we are getting hold of the query we type and sendind to Banner.jsx through props
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  /// filtering jobs according to the jobTitle
  //1)convert all the job titles in backend api to lowercase and our query also to lower case and then filter jobs based on match
  const filteredItems = jobs.filter((job) =>
    job.jobTitle
      ? job.jobTitle.toLowerCase().includes(query.toLowerCase())
      : false
  );
  ///Radio Filtering for locations
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  // button filtering for the houly,monthly,yearly
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  /// to calculate the pages range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };
  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Main function

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // filtering based upon the input items in the search bar
    if (query) {
      filteredJobs = filteredItems;
    }
    //category based filtering
    if (selected) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobPostingDate = new Date(job.postingDate);
        const selectedDate = new Date(selected);

        return (
          (job.jobLocation &&
            job.jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (job.maxPrice && parseInt(job.maxPrice) <= parseInt(selected)) ||
          (job.salaryType &&
            job.salaryType.toLowerCase() === selected.toLowerCase()) ||
          jobPostingDate >= selectedDate ||
          (job.experienceLevel &&
            job.experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (job.employmentType &&
            job.employmentType.toLowerCase() === selected.toLowerCase())
        );
      });
    }
    //slicing the data by page index range through the slice funvction
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  //in filteredData function there are 3 parameters to be send
  //1)the data i.e, jobs
  //2)our selected category based on button
  //3)our search query
  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            //here the result is rendering all card.jsx through the filteredData function through mapping
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}
          {/* Pagenation */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
