import Image from "next/image";
import axios from "axios";
import Dashboard from "@/app/components/dashboard";

interface ticket {
  id: number,
  title: String,
  desc: String,
  status: String,
  priority: String,
  createdAt: String,
  updatedAt: String
}

async function getAllTickets() {
  const issues = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issue`, {headers: {
    Authorization: process.env.NEXT_PUBLIC_API_KEY
  }})

  return issues;
}

function getOpenTickets(allTickets: Array<ticket>) {
  var openTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "OPEN") {
      openTickets.push(element);
    }
  });

  return openTickets;
}

function getInProgressTickets(allTickets: Array<ticket>) {
  var inProgressTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "IN_PROGRESS") {
      inProgressTickets.push(element);
    }
  });

  return inProgressTickets;
}

function getClosedTickets(allTickets: Array<ticket>) {
  var closedTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "CLOSED") {
      closedTickets.push(element);
    }
  });

  return closedTickets;
}

export default async function Home() {
  const allTicketsRes = await getAllTickets();
  const allTickets = allTicketsRes.data;
  const openTickets = getOpenTickets(allTickets);
  const inProgressTickets = getInProgressTickets(allTickets);
  const closedTickets = getClosedTickets(allTickets);

  return (
    <div className="p-5 flex justify-center mb-5">
      <Dashboard allTickets={allTickets} openTickets={openTickets} inProgressTickets = {inProgressTickets} closedTickets={closedTickets} />
    </div>
  );
}
