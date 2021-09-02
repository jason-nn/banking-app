import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("user");

  if (currentPage === "user") {
    return (
      <div>
        <Navbar onClick={(page) => setCurrentPage(page)} />
        <div>This is the User tab</div>
      </div>
    );
  } else if (currentPage === "withdraw") {
    return (
      <div>
        <Navbar onClick={(page) => setCurrentPage(page)} />
        <div>This is the Withdraw tab</div>
      </div>
    );
  } else if (currentPage === "deposit") {
    return (
      <div>
        <Navbar onClick={(page) => setCurrentPage(page)} />
        <div>This is the Deposit tab</div>
      </div>
    );
  } else if (currentPage === "transfer") {
    return (
      <div>
        <Navbar onClick={(page) => setCurrentPage(page)} />
        <div>This is the Transfer tab</div>
      </div>
    );
  }
}
