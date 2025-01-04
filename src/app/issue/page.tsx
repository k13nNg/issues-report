// "use client"
import React from 'react'
import NewIssueForm from '../components/newIssueForm';
import { getSession } from '../authentication'
import { Button, Table } from '@radix-ui/themes';
import axios from 'axios';
import { remark } from 'remark';
import html from 'remark-html';

const Issue = async () => {
  const session = await getSession();

  interface ticket {
    id: number,
    title: String,
    desc: String,
    status: String,
    author: number,
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

  function Priority(props: any) {
    if (props.priority === "LOW") {
        return (
            <div className='flex justify-center'>
                <div className="w-40 px-5 bg-green-200 rounded-sm text-center text-green-600">{props.priority}</div>
            </div>
        )
    } else if (props.priority === "MEDIUM") {
        return (
            <div className='flex justify-center'>
                <div className="w-40 px-5 bg-yellow-200 rounded-sm text-center text-yellow-600">{props.priority}</div>
            </div>
        )
    } else {
        return (
            <div className='flex justify-center'>
                <div className="w-40 px-5 bg-red-200 rounded-sm text-center text-red-600">{props.priority}</div>
            </div>
        )
    }
  }

  function TicketsTable(props: any) {
    const toDisplayList = allTickets.filter((elem: any) => {

      return elem.status.toLowerCase() === props.status || (elem.status === "IN_PROGRESS" && props.status === "inProgress")
    });

    if(toDisplayList.length === 0) {
      return (
        <div>
          <h1 className='text-3xl'>No Ticket</h1>
        </div>
      )
    } else {
      return (
        <Table.Root variant="ghost" size = "3">
          <Table.Header>
              <Table.Row>
                  <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify="center">Priority</Table.ColumnHeaderCell>
                  
              </Table.Row>
          </Table.Header>

          <Table.Body>
              {allTickets.map(async (elem: any) => {
                  if (elem.status.toLowerCase() === props.status || (elem.status === "IN_PROGRESS" && props.status === "inProgress")) {
                      return (
                          <Table.Row key={elem.id}>
                              <Table.Cell>{elem.title}</Table.Cell>
                              <Table.Cell><div className='max-w-64' dangerouslySetInnerHTML={{__html:(await remark()
                                                  .use(html)
                                                  .process(elem.desc))
                                                  .toString()}}></div></Table.Cell>
                              <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                          </Table.Row>
                      );
                  }
              })}

          </Table.Body>
      </Table.Root>
      )
    }
  }

  const allTicketsRes = await getAllTickets();
  const allTickets = allTicketsRes.data;

  return (
    <div className='p-5'>
      <div>
        {
          (session !== null && session.user.role === "USER") ? (
            <div className='flex flex-col space-y-5'>
              <h1 className="text-3xl">Welcome back, <i>{session.user.username}</i></h1>
              <div className="flex flex-col content-center items-center lg:items-start lg:flex-row md:space-x-10">
                <div className='lg:grow'>
                  <NewIssueForm className="grow" username = {session.user.username}/>
                </div>
                <div className='h-full'>
                  <h1 className='text-5xl'><b>My Tickets</b></h1>
                  <div className='mt-5'>
                    <h2 className='text-2xl my-5 bg-blue-200 text-blue-600 w-20 rounded-sm text-center'>Open</h2>
                    <div className='max-h-72 overflow-y-auto'>
                      <TicketsTable status="open"/>
                    </div>
                    <h2 className='text-2xl my-5 bg-orange-200 text-orange-600 w-32 rounded-sm text-center'>In Progress</h2>
                    <div className='max-h-72 overflow-y-auto'>                  
                      <TicketsTable status="inProgress"/>
                    </div>
                    <h2 className='text-2xl my-5 bg-purple-200 text-purple-600 w-24 rounded-sm text-center'>Closed</h2>
                    <div className='max-h-72 overflow-y-auto'>
                      <TicketsTable status="closed"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1 className='text-3xl'>Please log in to your user account to continue</h1>
          )
        }
      </div>
    </div>
  )
}

export default Issue