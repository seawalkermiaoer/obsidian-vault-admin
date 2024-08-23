import * as React from "react";
import { ItemView, WorkspaceLeaf } from 'obsidian';

/** @jsxImportSource react */
export const ReactView = ({ name }: { name: string }) => {
    return <h4>Hello, React! {name}</h4>;
};