"use client"
import { Table, Button } from '@radix-ui/themes';
import {marked} from "marked";
import {useState, useEffect} from "react";
import { FaPen } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

interface Ticket {
    id: number;
    title: string,
    desc: string,
    status: string,
    priority: string,
    author: string
}

const Admin = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
    // const [priorityEdit, setPriorityEdit] = useState(priority);
    const [statusEdit, setStatusEdit] = useState("OPEN");
    const [editElemID, setEditElemID] = useState(0);

  useEffect(() => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Accept", "application/json");
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", process.env.NEXT_PUBLIC_API_KEY ? 
                                        (process.env.NEXT_PUBLIC_API_KEY) : 
                                        (""));


    fetch("/api/issue", 
      {headers: requestHeaders,
      method: "GET"})
      .then((res) => res.json())
      .then((data) => setAllTickets(data))
  }, [])

  function handleSubmit(elem: Ticket) {
    const data = {
        id: elem.id,
        title: elem.title,
        desc: elem.desc,
        priority: elem.priority,
        status: statusEdit,
    }

    try {

        axios.put("/api/issue", data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": process.env.NEXT_PUBLIC_API_KEY
            }
        }).then((res) => window.location.reload());

    } catch (err) {
        console.log(err)
    }

  }

  function handleDelete(elem: Ticket) {
    const data = {id: elem.id};

    try {
        axios.delete("/api/issue", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": process.env.NEXT_PUBLIC_API_KEY
            },
            data
        }).then((res) => window.location.reload());

    } catch (err) {
        console.log(err)
    }
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
                      <Table.ColumnHeaderCell>
                        Title
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Description
                      </Table.ColumnHeaderCell>
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
                      <Table.ColumnHeaderCell justify="center">
                        Camp
                      </Table.ColumnHeaderCell>
                      {
                            <Table.ColumnHeaderCell justify="center">
                               <div className='text-center px-auto'>
                                    <select name="status" id="status" className='text-center' value={status} onChange={(e) => {
                                        setPriority("all")
                                        setStatus(e.target.value)
                                    }}>
                                        <option value="all">All</option>
                                        <option value="open">Open</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                               </div>
                            </Table.ColumnHeaderCell>
                        
                      }
                      <Table.ColumnHeaderCell justify="center">
                        <p className='text-center'>Action</p>
                      </Table.ColumnHeaderCell>
                  </Table.Row>
              </Table.Header>
  
              <Table.Body>
                  {allTickets.map((elem: any) => {
                      if ( (elem.priority === props.priority || 
                            props.priority === "all") && 
                            (elem.status.toLowerCase() === props.status || 
                            props.status === "all" || 
                            (elem.status === "IN_PROGRESS" && 
                            props.status === "inProgress"))) {
                          return (
                              <Table.Row key={elem.id}>
                                  <Table.RowHeaderCell>{elem.title}</Table.RowHeaderCell>
                                  <Table.Cell>
                                    {
                                      <div className='max-w-64' dangerouslySetInnerHTML={{__html:marked.parse(elem.desc)}}></div>
                                    }
                                    </Table.Cell>
                                  <Table.Cell>
                                      <Priority priority={elem.priority}/>
                                    
                                  </Table.Cell>
                                  <Table.Cell justify="center">{elem.author}</Table.Cell>
                                  <Table.Cell justify="center">
                                    {
                                        (isEditing && elem.id === editElemID) ? (
                                            <select name="status" id="status" className='text-center' value={statusEdit} onChange={(e) => {
                                                setStatusEdit(e.target.value)
                                            }}>
                                              <option value="OPEN">Open</option>
                                              <option value="IN_PROGRESS">In Progress</option>
                                              <option value="CLOSED">Closed</option>
                                            </select>
                                        ) : (
                                            <Status status={elem.status}/>
                                        )
                                    }
                                  </Table.Cell>
                                  <Table.Cell justify="center">
                                    <div className='text-center w-full'>
                                        {
                                            (isEditing && elem.id === editElemID) ? (
                                                <Button className='hover:cursor-pointer' onClick={
                                                    () => {
                                                        setIsEditing(!isEditing);
                                                        handleSubmit(elem);
                                                    }
                                                }>
                                                    Submit <TiTick/>
                                                </Button>
                                            ) : 
                                                <div className='space-x-3'>

                                                    <Button className='hover:cursor-pointer my-2' onClick={() => 
                                                        {
                                                            setIsEditing(!isEditing);
                                                            setEditElemID(elem.id);
                                                        }
                                                        }>
                                                            Edit <FaPen /> 
                                                    </Button>
                                                    <Button className='hover:cursor-point bg-red-500 my-2' onClick={() => 
                                                        {
                                                            handleDelete(elem);
                                                        }
                                                    }>
                                                        Delete <FaRegTrashAlt/>
                                                    </Button>
                                                </div>
                                            
                                        }
                                    </div>
                                    </Table.Cell>
                              </Table.Row>
                          );
                      } 
                       
                  })}
  
              </Table.Body>
          </Table.Root>    
          )
  }


  return (
    <div className='w-full wrap px-5'>
        <TicketsTable status={status} priority={priority}/>
    </div>
  )
}

export default Admin