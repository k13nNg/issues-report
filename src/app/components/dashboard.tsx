"use client"
import {useState} from 'react';
import SmallWidget from "@/app/components/smallWidget";
import { Table } from '@radix-ui/themes';
import {marked} from "marked";

const Dashboard = (props: any) => {
    const [status, setStatus] = useState("all");
    const [priority, setPriority] = useState("all");
  
    const allTickets = props.allTickets;
    const openTickets = props.openTickets;
    const inProgressTickets = props.inProgressTickets;
    const closedTickets = props.closedTickets;

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

    function Status(props: any) {
        if (props.status === "OPEN") {
            return (
                <div className='flex justify-center'>
                    <div className="w-40 px-5 bg-blue-200 rounded-sm text-center text-blue-600">{props.status}</div>
                </div>
            )
        } else if (props.status === "IN_PROGRESS") {
            return (
                <div className='flex justify-center'>
                    <div className="w-40 px-5 bg-orange-200 rounded-sm text-center text-orange-600">{props.status.replace("_", " ")}</div>
                </div>
            )
        } else {
            return (
                <div className='flex justify-center'>
                    <div className="w-40 px-5 bg-purple-200 rounded-sm text-center text-purple-600">{props.status}</div>
                </div>
            )
        }
    }

    function TicketsTable(props: any) {
        return (
            <Table.Root variant="ghost" size = "3">
               <Table.Header>
                   <Table.Row>
                       <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell justify="center">
                        <select name="priority" id="priority" className='text-center' value={priority} onChange={(e) => {
                            setStatus("all");
                            setPriority(e.target.value)
                        }}>
                          <option value="all">All</option>
                          <option value="LOW">LOW</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HIGH">HIGH</option>
                        </select>
                        </Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell justify="center">Camp</Table.ColumnHeaderCell>

                       <Table.ColumnHeaderCell justify="center">
                       <select name="status" id="status" className='text-center' value={status} onChange={(e) => {
                            setPriority("all")
                            setStatus(e.target.value)
                        }}>
                          <option value="all">All</option>
                          <option value="open">Open</option>
                          <option value="inProgress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                       </Table.ColumnHeaderCell>
                       
                   </Table.Row>
               </Table.Header>

               <Table.Body>
                    {allTickets.map((elem: any) => {
                      if ( (elem.priority === props.priority || props.priority === "all") && (elem.status.toLowerCase() === props.status || props.status === "all" || (elem.status === "IN_PROGRESS" && props.status === "inProgress"))) {
                          return (
                              <Table.Row key={elem.id}>
                                  <Table.Cell>{elem.title}</Table.Cell>
                                  <Table.Cell>{
                                      <div className='max-w-64' dangerouslySetInnerHTML={{__html:marked.parse(elem.desc)}}></div>}</Table.Cell>
                                  <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                                  <Table.Cell justify="center">{elem.author}</Table.Cell>
                                  <Table.Cell><Status status={elem.status}/></Table.Cell>
                              </Table.Row>
                          );
                      } 
                       
                    })}
               </Table.Body>
            </Table.Root>    
           )
    }

    return (
        <div className='flex flex-col space-y-5 content-start items-center'>
            <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
                <SmallWidget iconString="all" title="Total Tickets" data={allTickets.length}/>
                <SmallWidget iconString="open" title="Open Tickets" data={openTickets.length}/>
                <SmallWidget iconString="inProgress" title="In Progress Tickets" data={inProgressTickets.length}/>
                <SmallWidget iconString="closed" title="Closed Tickets" data={closedTickets.length}/>
            </div>

            <div className='h-2/4 w-1/2 md:w-full wrap overflow-auto'>
                <TicketsTable status={status} priority={priority}/>

            </div>

        </div>
    )
}

export default Dashboard