"use client";

import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import nanoid from "@/lib/nanoid";

interface UploadContentProps {
    file: File;
    status: string;
}

export default function UploadContent() {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<UploadContentProps[]>([]);

    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            for (let i = 0; i < e.target.files["length"]; i++) {
                let id = nanoid({length: 12}), originalFile = e.target.files[i],
                    f = new File([originalFile], id + "." +  originalFile.name.split(".").pop(), {
                        type: originalFile.type,
                        lastModified: originalFile.lastModified,
                    });
                setFiles((prevState: any) => [
                    ...prevState,
                    {file: f, status: "pending"}
                ]);
            }
        }
    }

    function handleSubmitFile(e: any) {
        if (files.length === 0) {
            // no file has been submitted
        } else {
            files.forEach(async (f) => {
                let result = await fetch(
                    "/api/graph/upload?name=" + f.file.name,
                    {
                        method: "PUT",
                        body: f.file
                    }
                ), json = await result.json();
                setFiles((prevState: any) => {
                    let newArr = [...prevState];
                    newArr[prevState.indexOf(f)].status =
                        json["success"] ? "success" : "failed";
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
                let id = nanoid({length: 12}), originalFile = e.dataTransfer.files[i],
                    f = new File([originalFile], id + "." + originalFile.name.split(".").pop(), {
                        type: originalFile.type,
                        lastModified: originalFile.lastModified,
                    });
                setFiles((prevState: any) => [
                    ...prevState,
                    {file: f, status: "pending"}
                ]);
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
        <div className="flex h-screen items-center justify-center">
            <form
                className={`${
                    dragActive
                        ? "bg-slate-400 dark:bg-slate-600"
                        : "bg-slate-100 dark:bg-slate-900"
                }  flex min-h-[10rem] w-full max-w-[1080px] mx-auto flex-col items-center justify-center rounded-lg px-8 py-4 text-center`}
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
                        className="cursor-pointer font-bold text-blue-600 dark:text-blue-400"
                        onClick={openFileExplorer}
                    >
                        <u>Select files</u>
                    </span>{" "}
                    to upload
                </p>

                <div className="flex flex-wrap flex-row items-center p-3">
                    {files.map((file: any, idx: any) => (
                        <div key={idx}
                             className="flex flex-col w-[33.33%] lg:w-[25%] aspect-square align-middle justify-start">
                            <div className="flex-row space-x-2">
                                <span>{file.file.name}</span>
                                <span
                                    className={
                                        "select-none " +
                                        (file.status === "pending"
                                            ? "text-blue-600 dark:text-blue-400"
                                            : file.status === "success"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400")
                                    }
                                >
                                {file.status === "pending"
                                    ? "Pending..."
                                    : file.status === "success"
                                        ? "Success"
                                        : "Failed"}
                            </span>
                                <FontAwesomeIcon icon={faClose}
                                                 className="cursor-pointer text-red-600 dark:text-red-400"
                                                 onClick={() => removeFile(file.file.name, idx)}/>
                            </div>
                            <div className="">
                                <img src={file.file ? URL.createObjectURL(file.file) : ""} alt={"preview-" + idx}
                                     className="w-full h-full object-contain"/>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-3 w-auto rounded-lg bg-slate-800 p-2 dark:bg-slate-200"
                    onClick={handleSubmitFile}
                >
                    <span className="p-2 font-bold text-white dark:text-black">
                        Submit
                    </span>
                </button>
            </form>
        </div>
    );
}
