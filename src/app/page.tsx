import axios from "axios";
import Dashboard from "@/app/components/dashboard";

interface ticket {
  id: number,
  title: string,
  desc: string,
  status: string,
  priority: string,
  createdAt: string,
  updatedAt: string
}

async function getAllTickets() {
  // const issues = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket`, {headers: {
  //   Authorization: process.env.NEXT_PUBLIC_API_KEY
  // }})

  try {
    const issues = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket`, {headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY
    }})

    console.log(`Issues: ${await issues}`);
    return issues;
  } catch (err) {
    
    console.log(`Error: ${err}`);
  }

}

function getOpenTickets(allTickets: Array<ticket>) {
  const openTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "OPEN") {
      openTickets.push(element);
    }
  });

  return openTickets;
}

function getInProgressTickets(allTickets: Array<ticket>) {
  const inProgressTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "IN_PROGRESS") {
      inProgressTickets.push(element);
    }
  });

  return inProgressTickets;
}

function getClosedTickets(allTickets: Array<ticket>) {
  const closedTickets = new Array<ticket>();

  allTickets.forEach(element => {
    if (element.status === "CLOSED") {
      closedTickets.push(element);
    }
  });

  return closedTickets;
}

export default async function Home() {
  const allTicketsRes = await getAllTickets();
  const allTickets = allTicketsRes?.data;
  const openTickets = getOpenTickets(allTickets);
  const inProgressTickets = getInProgressTickets(allTickets);
  const closedTickets = getClosedTickets(allTickets);

  return (
    <div className="p-5 flex justify-center mb-5">
      <Dashboard allTickets={allTickets} openTickets={openTickets} inProgressTickets = {inProgressTickets} closedTickets={closedTickets} />
    </div>
  );
}
