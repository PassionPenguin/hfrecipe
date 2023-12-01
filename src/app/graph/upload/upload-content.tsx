"use client";

import {useRef, useState} from "react";
import {MSGraphDriveProvider} from "@/lib/ms-graph/drive";
import {MSGraphClient} from "@/lib/ms-graph/client";

interface UploadContentProps {
    file: File,
    status: string
}

export default function UploadContent() {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<UploadContentProps[]>([]);

    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, {file: e.target.files[i], status: "pending"}]);
            }
        }
    }

    function handleSubmitFile(e: any) {
        if (files.length === 0) {
            // no file has been submitted
        } else {
            files.forEach(async (f) => {
                let result = await fetch("/api/graph/upload?name=" + f.file.name, {
                    method: "PUT",
                    body: f.file
                });
                setFiles((prevState: any) => {
                    let newArr = [...prevState];
                    newArr[prevState.indexOf(f)].status = result.status === 200 ? "success" : "failed";
                    return newArr;
                });
            });
        }
    }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(fileName: any, idx: any) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                className={`${
                    dragActive ? "bg-slate-400 dark:bg-slate-600" : "bg-slate-100 dark:bg-slate-900"
                }  p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                onDragEnter={handleDragEnter}
                onSubmit={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                {/* this input element allows us to select files for upload. We make it hidden, so we can activate it when the user clicks select files */}
                <input
                    placeholder="fileInput"
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    multiple={true}
                    onChange={handleChange}
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                />

                <p>
                    Drag & Drop files or{" "}
                    <span
                        className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
                        onClick={openFileExplorer}
                    >
            <u>Select files</u>
          </span>{" "}
                    to upload
                </p>

                <div className="flex flex-col items-center p-3">
                    {files.map((file: any, idx: any) => (
                        <div key={idx} className="flex flex-row space-x-5">
                            <span>{file.file.name}</span>
                            <span
                                className="text-red-500 cursor-pointer"
                                onClick={() => removeFile(file.file.name, idx)}
                            >
                remove
              </span>
                            <span
                                className={file.status === "pending" ? "text-blue-400 dark:text-blue-600" : file.status === "success" ? "text-green-400 dark:text-green-600" : "text-red-400 dark:text-red-600"}>
                                {file.status === "pending" ? "pending" : file.status === "success" ? "success" : "failed"}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    className="bg-slate-800 dark:bg-slate-200 rounded-lg p-2 mt-3 w-auto"
                    onClick={handleSubmitFile}
                >
                    <span className="p-2 dark:text-black text-white font-bold">Submit</span>
                </button>
            </form>
        </div>
    );
}