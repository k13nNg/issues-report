"use client"
import React from 'react'
import { MdOutlineReportProblem } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";

const SmallWidget = (props: any) => {

    const GetIcon = (value: any) => {
        if (value.val === "all") {
            return <IoTicketSharp size = {70}/>
        } else if (value.val === "open") {
            return <MdOutlineReportProblem size = {70}/>
        } else if (value.val == "inProgress") {
            return <GrInProgress size = {70} />
        } else {
            return <MdDone size = {70}/>
        }
    }
    return (
        // <div>smallWidget</div>
        <div className="w-64 p-3 hover:border-blue-500 hover:bg-gray-300 border-solid border-2 rounded-md text-center flex items-center flex-col space-y-2">
            <GetIcon val={props.iconString} />
            <h1>{props.title}</h1>
            <p>{props.data}</p>
        </div>
    )
}

export default SmallWidget;