"use client"
import {useState, createContext, useContext} from 'react';
import SmallWidget from "@/app/components/smallWidget";
import { Button, Table } from '@radix-ui/themes';
import StatusContext from '../context/status';

const Dashboard = (props: any) => {
    const [status, setStatus] = useState("all");
    const allTickets = props.allTickets;
    const openTickets = props.openTickets;
    const inProgressTickets = props.inProgressTickets;
    const closedTickets = props.closedTickets;

    function Priority(props: any) {
        if (props.priority === "LOW") {
            return (
                <div className="px-5 bg-green-200 rounded-sm text-center text-green-600">{props.priority}</div>
            )
        } else if (props.priority === "MEDIUM") {
            return (
                <div className="px-5 bg-yellow-200 rounded-sm text-center text-yellow-600">{props.priority}</div>
            )
        } else {
            return (
                <div className="px-5 bg-red-200 rounded-sm text-center text-red-600">{props.priority}</div>
            )
        }
    }

    function StatusTitle(props: any) {
        if (props.status === "all") {
            return (
                <h1 className="text-3xl font-bold">All Issues</h1>
            )
        } else if (props.status === "open") {
            return (
                <h1 className='text-3xl font-bold'>Open Issues</h1>
            )
        } else if (props.status === "inProgress") {
            return (
                <h1 className='text-3xl font-bold'>In Progress Issues</h1>
            )
        } else {
            return (
                <h1 className='text-3xl font-bold'>Closed Issues</h1>
            )
        }
    }

    function Status(props: any) {
        if (props.status === "OPEN") {
            return (
                <div className="px-5 bg-blue-200 rounded-sm text-center text-blue-600">{props.status}</div>
            )
        } else if (props.status === "IN_PROGRESS") {
            return (
                <div className="px-5 bg-orange-200 rounded-sm text-center text-orange-600">{props.status.replace("_", " ")}</div>
            )
        } else {
            return (
                <div className="px-5 bg-purple-200 rounded-sm text-center text-purple-600">{props.status}</div>
            )
        }
    }

    function TicketsTable(props: any) {
        if (props.status === "all") {
            return (
             <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Camp</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {allTickets.map((elem: any) => {
                        return (
                            <Table.Row key={elem.id}>
                                <Table.Cell>{elem.title}</Table.Cell>
                                <Table.Cell>{elem.desc}</Table.Cell>
                                <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                                <Table.Cell>{elem.author}</Table.Cell>
                                <Table.Cell><Status status={elem.status}/></Table.Cell>
                            </Table.Row>
                        );
                    })}

                </Table.Body>
             </Table.Root>    
            )
        } else if (props.status === "open") {
            return (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Camp</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {openTickets.map((elem: any) => {
                            return (
                                <Table.Row key={elem.id}>
                                    <Table.Cell>{elem.title}</Table.Cell>
                                    <Table.Cell>{elem.desc}</Table.Cell>
                                    <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                                    <Table.Cell>{elem.author}</Table.Cell>
                                    <Table.Cell><Status status={elem.status}/></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            )
        } else if (props.status === "inProgress") {
            return (
                <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Camp</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {inProgressTickets.map((elem: any) => {
                        return (
                            <Table.Row key={elem.id}>
                                <Table.Cell>{elem.title}</Table.Cell>
                                <Table.Cell>{elem.desc}</Table.Cell>
                                <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                                <Table.Cell>{elem.author}</Table.Cell>
                                <Table.Cell><Status status={elem.status}/></Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
             </Table.Root>
            )
        } else {
            return (
                <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Camp</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {closedTickets.map((elem: any) => {
                        return (
                            <Table.Row key={elem.id}>
                                <Table.Cell>{elem.title}</Table.Cell>
                                <Table.Cell>{elem.desc}</Table.Cell>
                                <Table.Cell><Priority priority={elem.priority}/></Table.Cell>
                                <Table.Cell>{elem.author}</Table.Cell>
                                <Table.Cell><Status status={elem.status}/></Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
             </Table.Root>
            )
        }
    }

    return (
        <div className='flex flex-col space-y-5 items-center justify-center'>
            <h1 className="text-3xl font-bold">Summary</h1>
            <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
                <StatusContext.Provider value={{status, setStatus}}>
                    <SmallWidget iconString="all" title="Total Tickets" data={allTickets.length}/>
                    <SmallWidget iconString="open" title="Open Tickets" data={openTickets.length}/>
                    <SmallWidget iconString="inProgress" title="In Progress Tickets" data={inProgressTickets.length}/>
                    <SmallWidget iconString="closed" title="Closed Tickets" data={closedTickets.length}/>
                </StatusContext.Provider>
            </div>
            <StatusTitle status={status}/>
            <div>
                <TicketsTable status={status}/>
            </div>

        </div>
    )
}

export default Dashboard