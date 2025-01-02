"use client"
import {useState, createContext, useContext} from 'react';
import SmallWidget from "@/app/components/smallWidget";
import { Button, Table } from '@radix-ui/themes';
import StatusContext from '../context/status';
import * as ScrollArea from "@radix-ui/react-scroll-area";

const Dashboard = (props: any) => {
    const [status, setStatus] = useState("all");
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

    function StatusTitle(props: any) {
        if (props.status === "all") {
            return (
                <h1 className="text-3xl font-bold">All Tickets</h1>
            )
        } else if (props.status === "open") {
            return (
                <h1 className='text-3xl font-bold'>Open Tickets</h1>
            )
        } else if (props.status === "inProgress") {
            return (
                <h1 className='text-3xl font-bold'>In Progress Tickets</h1>
            )
        } else {
            return (
                <h1 className='text-3xl font-bold'>Closed Tickets</h1>
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
            <Table.Root variant="surface" size = "3">
               <Table.Header>
                   <Table.Row>
                       <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell justify="center">Priority</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell justify="center">Camp</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell justify="center">Status</Table.ColumnHeaderCell>
                       <Table.ColumnHeaderCell />
                   </Table.Row>
               </Table.Header>

               <Table.Body>
                   {allTickets.map((elem: any) => {
                        if (elem.status.toLowerCase() === props.status || props.status === "all" || (elem.status === "IN_PROGRESS" && props.status === "inProgress")) {
                            return (
                                <Table.Row key={elem.id}>
                                    <Table.Cell>{elem.title}</Table.Cell>
                                    <Table.Cell>{elem.desc}</Table.Cell>
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
        <div className='flex flex-col space-y-5 items-center justify-center'>

            <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
                <StatusContext.Provider value={{status, setStatus}}>
                    <SmallWidget iconString="all" title="Total Tickets" data={allTickets.length}/>
                    <SmallWidget iconString="open" title="Open Tickets" data={openTickets.length}/>
                    <SmallWidget iconString="inProgress" title="In Progress Tickets" data={inProgressTickets.length}/>
                    <SmallWidget iconString="closed" title="Closed Tickets" data={closedTickets.length}/>
                </StatusContext.Provider>
            </div>
            <StatusTitle status={status}/>
            <div className='w-1/2 md:w-full wrap max-h-screen overflow-auto'>
                <TicketsTable status={status}/>

            </div>

        </div>
    )
}

export default Dashboard