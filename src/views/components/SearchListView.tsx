import * as React from "react";
import { App, TFile, Notice } from 'obsidian'

// 单个列表项组件
const Item = ({ title, summary, onTitleClick, onLinkClick }: {
    title: string; summary: string; onTitleClick: () => void; onLinkClick: () => void;
}) => {
    return (
        <div style={styles.itemContainer} draggable="true">
            <div style={styles.titleUrlContainer} onClick={onTitleClick}>
                {title}
            </div>
            <p>{summary}</p>
            <button onClick={onLinkClick}>link it</button>
        </div>
    );
};


// 列表组件

export const ItemList = ({ app }: { app: App }) => {
    const openMarkdownFile = (uri: string) => {
        const file = app.vault.getAbstractFileByPath(uri);
        if (file instanceof TFile) {
            app.workspace.getLeaf(false).openFile(file);
        } else {
            new Notice("File not found!");
        }
    };

    const items = [
        {
            title: '1.00 | 骨干',
            uri: 'Omnivore/骨干.md',
            summary: 'This is a summary of item 1.',
        },
        {
            title: '0.95 | Obsidian卡片视图',
            uri: 'Omnivore/Obsidian卡片视图.md',
            summary: 'This is a summary of item 2.',
        },
        {
            title: '0.70 | 忍不住想问一句这是Obsidian还是浏览器！',
            uri: 'Omnivore/忍不住想问一句这是Obsidian还是浏览器！.md',
            summary: 'This is a summary of item 3.',
        },
    ];

    const handleTitleClick = (uri: string) => {
        console.log('open file', uri)
        openMarkdownFile(uri);
    };


    const handleLinkClick = (uri: string) => {
        console.log('link it', uri)
    };


    return (
        <div style={styles.listContainer}>
            {items.map((item, index) => (
                <Item
                    key={index}
                    title={item.title}
                    summary={item.summary}
                    onTitleClick={() => handleTitleClick(item.uri)}
                    onLinkClick={() => handleLinkClick(item.uri)}
                />
            ))}
        </div>

    );
};

// 简单的样式对象
const styles = {
    itemContainer: {
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
    },
    titleUrlContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    title: {
        margin: 0,
        marginRight: '10px',
        fontSize: '1.2em',
        color: '#0066cc',
        textDecoration: 'none',
    },
    url: {
        color: '#0066cc',
        textDecoration: 'none',
        fontSize: '0.9em',
        wordBreak: 'break-all',
    },
    listContainer: {
        maxWidth: '600px',
        margin: '0 auto',
    },
};

