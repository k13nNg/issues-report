"use client"
import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const Issue = () => {
  const toolbar = [
    {
      name: "bold",
      action: function customFunction(editor:any) {
        editor.toggleBold();
      },
      className: "fa fa-bold",
      title: "Bold"
    },
    {
      name: "italic",
      action: function customFunction(editor:any) {
        editor.toggleItalic();
      },
      className: "fa fa-italic",
      title: "Italicize"
    },
    {
      name: "heading",
      action: function customFunction(editor:any) {
        editor.toggleHeading1();
      },
      className: "fa fa-header header-1",
      title: "Heading"
    }
  ];
  return (
    <div className='px-5 '>
      <div className='flex flex-col md:flex-row space-x-5'>
        <div className='grow w-xl'>
          <h1 className="text-5xl mb-5"><b>Create New Issues</b></h1>
          <TextField.Root placeholder='Title' className='mb-5'>
          </TextField.Root>

          <SimpleMDE placeholder='Description' options={{
            toolbar: toolbar
          }}/>
          <div className="text-right mt-3">
            <Button>Submit</Button>
          </div>
        </div>
        <div className='grow items-start'>
          <h1 className='text-5xl mb-5'><b>My Issues</b></h1>
          <h2 className='text-2xl'>Open</h2>
          <h2 className='text-2xl'>In Progress</h2>
          <h2 className='text-2xl'>Closed</h2>
        </div>
      </div>
    </div>
  )
}

export default Issue