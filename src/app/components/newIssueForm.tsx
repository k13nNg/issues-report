"use client"
import {useMemo} from 'react'
import { TextField, Button } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
// import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewIssueForm = (props: any) => {
    const router = useRouter();

    const toolbar = [
        {
            name: "bold",
            action: function customFunction1(editor:any) {
                editor.toggleBold();
            },
            className: "fa fa-bold",
            title: "Bold"
        },
        {
            name: "italic",
            action: function customFunction2(editor:any) {
                editor.toggleItalic();
            },
            className: "fa fa-italic",
            title: "Italicize"
        },
        {
            name: "heading",
            action: function customFunction3(editor:any) {
                editor.toggleHeading1();
            },
            className: "fa fa-header header-1",
            title: "Heading"
        },
        {
            name: "preview",
            action: function customFunction4(editor: any) {
                editor.togglePreview();
            },
            className: "fa fa-eye no-disable",
            title: "Preview"
        }
    ];

    const options = useMemo(() => ({
        autofocus: false,
        spellChecker: true,
        toolbar: toolbar,
      }), []);
    
    enum Priority {
      LOW,
      MEDIUM,
      HIGH
    }
    
    interface IssueForm {
      title: string,
      priority: Priority,
      desc: string
    }

    const {register, control, handleSubmit} = useForm<IssueForm>();


  return (
    <div className=''>
        <div>
            <h1 className="text-5xl"><b>Create New Ticket</b></h1>
            <form onSubmit={handleSubmit(async (data) => {
                const payload = {
                    title: data.title,
                    priority: data.priority,
                    desc: data.desc,
                    author: props.username
                }
                try{
                    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ticket`, payload, {
                        headers: {"Authorization": process.env.NEXT_PUBLIC_API_KEY}
                    })
                    router.push("/");
                } catch (error) {
                    console.log(error)
                }

            })}>
                <div className='flex flex-row items-start space-x-10 justify-between mt-5'>
                    <TextField.Root placeholder='Title' className='grow' {...register("title")}>
                    </TextField.Root>
                    <select className='border border-gray-300 rounded-sm px-2 py-1 h-full' id="priority" aria-placeholder='LOW' defaultValue="null" {...register("priority")}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <div className="mt-7">
                    <Controller
                        name="desc"
                        control={control}
                        render={({field}) => 
                        <SimpleMDE 
                            placeholder='Description' 
                            options={options}
                        {...field}/>}
                    />
                    <div className='text-right'>
                        <Button className='hover:cursor-pointer'>Submit</Button>
                    </div>
                </div>
            </form>
            </div>
            
    </div>
  )
}

export default NewIssueForm