import { ItemView, WorkspaceLeaf, TFile } from "obsidian";
import t from 'src/l10n/locale';

import { StrictMode } from "react";
import { Root, createRoot } from "react-dom/client";
import { ReactView } from "./components/TestView";

import { VaultAdminPluginSettings } from 'src/models/pluginSettings';

// import { ItemList } from "./components/SearchListView";

import { AppContext } from "src/context";


export const VIEW_TYPE_VA_DISCOVERY = "va-discovery-view";


let s = '数据'


export class VADiscoveryView extends ItemView {
  root: Root | null = null;
  settings: VaultAdminPluginSettings;
  constructor(leaf: WorkspaceLeaf, settings: VaultAdminPluginSettings ) {
    super(leaf);
    this.settings = settings
  }

  getViewType() {
    return VIEW_TYPE_VA_DISCOVERY;
  }

  getDisplayText() {
    return t("VA Discovery View");
  }

  async onOpen() {
    this.icon = "link-2";

    console.log("onOpen");

    this.registerEvent(this.app.workspace.on('file-open', (file: TFile | null) => {
      // console.log('a new file has open the arena: ' + file?.name)
      s = file?.name ?? ''
      console.log("event:" + s)
      this.root?.unmount

      this.root = createRoot(this.containerEl.children[1]);
      this.root.render(
        <AppContext.Provider value={this.app}>
          <StrictMode>
            <ItemList
              app={this.app} settings={this.settings} />
          </StrictMode>
        </AppContext.Provider>
      );
      console.log('change?');

    }));

    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <AppContext.Provider value={this.app} >
        <StrictMode>
          <ItemList
            app={this.app} settings={this.settings}/>
        </StrictMode>
      </AppContext.Provider>
    );


  }

  async onClose() {
    this.root?.unmount();
  }
}




import * as React from "react";
import { App, Notice } from 'obsidian'
import { difySearch } from "src/libs/dify_search";

// 单个列表项组件
const Item = ({ title, uri, content, onTitleClick, onLinkClick }: {
  title: string; content: string; uri: string; onTitleClick: () => void; onLinkClick: () => void;
}) => {
  return (
    <div style={styles.itemContainer} draggable="true">
      <div style={styles.titleContainer} onClick={onTitleClick}>
        <a style={styles.titleLink} title={uri} draggable="true">
          <small>{title}</small>
        </a>
      </div>
      <div style={styles.summaryContainer}>
        {content}
      </div>
      {/* <p>{summary}</p> */}
      {/* <button onClick={onLinkClick}>link it</button> */}
    </div>
  );
};





export const ItemList = ({ app, settings }: { app: App, settings: VaultAdminPluginSettings }) => {
  const [items, setItems] = React.useState<Array<{ title: string; uri: string; content: string }>>([]);

  const openMarkdownFile = (uri: string) => {
    const file = app.vault.getAbstractFileByPath(uri);
    if (file instanceof TFile) {
      app.workspace.getLeaf(false).openFile(file);
    } else {
      new Notice("File not found!");
    }
  };



  React.useEffect(() => {
    const fetchItems = async () => {
      const result = await difySearch(s, settings.difyBaseUrl + '/workflows/run' ,settings.wfSearchApiSecret, "search_from_obsidian");
      setItems(result);
    };
    fetchItems();
  }, []);

  // console.log(items);


  const handleTitleClick = (uri: string) => {
    console.log('open file', uri);
    openMarkdownFile(uri);
  };

  const handleLinkClick = (uri: string) => {
    console.log('link it', uri);
  };

  return (
    <div style={styles.listContainer}>
      {items.map((item: { title: string; uri: string; content: string; }, index: React.Key | null | undefined) => (
        <Item
          key={index}
          title={item.title}
          uri={item.uri}
          content={item.content}
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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  title: {
    margin: 0,
    marginRight: '10px',

    color: '#0066cc',
    textDecoration: 'none',
  },
  titleLink: {
    color: 'black',
    fontSize: '1.0em',
    fontWeight: 'bold',
  },
  listContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  summaryContainer: {
    marginTop: '10px',
    marginBottom: '15px',
    fontSize: '0.9em',
  },

};

