'use client'

import {CountableExtras} from "@/lib/utils/extrasConverter";
import React, {useEffect, useState} from "react";
import Loading, {LoadingSkeletonType} from "@/components/loading";
import {InputType, UIInput, UITextarea} from "@/components/ui/input";

export default function ExtrasEditor({recipeId, tableName, extrasName, _extras}: { recipeId: string, tableName: string, extrasName: string, _extras?: string }) {
    const [allExtras, setAllExtras] = useState([]);
    const [extras, setExtras] = useState<CountableExtras[]>([]);

    useEffect(() => {
        fetch("/api/" + extrasName + "/list").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setAllExtras(data);
                    setExtras(_extras ? _extras.split("|").map(e => new CountableExtras({string: e, all: data})) : []);
                });
            }
        });
    }, []);

    const [ddl, setDDLs] = useState("");
    const [log, setLog] = useState("");

    function generateInserts(fd: FormData) {
        let newExtras = (fd.get("input") as string).split("|").map(e => new CountableExtras({string: e, all: allExtras}));
        /// Compare the `newExtras` with the `extras` and generate the inserts, update and delete.
        /// Then, set the `inserts` state to the generated inserts.

        setDDLs("");
        let oldSize = extras.length, oldVisited = [], newSize = newExtras.length, newVisited = [];
        let inserts: any[], updates = [], deletes: any[];
        for (let i = 0; i < oldSize; i++) oldVisited[i] = 0;
        for (let i = 0; i < newSize; i++) newVisited[i] = 0;

        for (let i = 0; i < oldSize; i++)
            for (let j = 0; j < newSize; j++)
                if (extras[i].name === newExtras[j].name) {
                    oldVisited[i] = 1;
                    newVisited[j] = 1;
                    if (extras[i].amount === newExtras[j].amount && extras[i].unit.id === newExtras[j].unit.id)
                        continue;
                    updates.push(newExtras[j]);
                }

        inserts = newExtras.filter((_, i) => newVisited[i] === 0);
        deletes = extras.filter((_, i) => oldVisited[i] === 0);

        inserts = inserts.map(e => e.toInsertDDL(recipeId, tableName, extrasName));
        updates = updates.map(e => e.toUpdateDDL(recipeId, tableName, extrasName));
        deletes = deletes.map(e => e.toDeleteDDL(recipeId, tableName, extrasName));

        setDDLs((inserts.join("\n") + "\n" + updates.join("\n") + "\n" + deletes.join("\n")).trim());
    }

    function execInserts() {
        let fd = new FormData();
        fd.set("ddl", ddl);

        fetch("/api/sql/exec", {
            method: "POST",
            body: fd
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    setLog(log + "\n" + data);
                });
            }
        });
    }

    if (!allExtras.length) {
        console.log(extrasName, "\t", _extras, "\n", extras, "\n");
        return <Loading type={LoadingSkeletonType.text}/>;
    }

    return (
        <>
            <form action={generateInserts} className="space-y-4">
                <UITextarea
                    name="input"
                    title="Raw Input"
                    defaultValue={extras.map(e => e.toString()).join("|")}
                    hint="{NAME}-{DESC}|..."
                />
                <UIInput
                    type={InputType.submit}
                    name="submit"
                    title="Generate DDL"
                />
            </form>
            <form action={execInserts} className="space-y-4">
                <pre>
                    <code>{ddl}</code>
                </pre>
                <UIInput
                    type={InputType.submit}
                    name="submit"
                    title="Submit DDL"
                />
            </form>

            <pre>
                <code>{log}</code>
            </pre>
        </>
    );
}