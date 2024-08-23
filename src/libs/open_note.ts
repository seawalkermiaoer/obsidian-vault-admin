export async function openNote(plugin: any, targetPath: string, event: KeyboardEvent | null = null): Promise<void> {
    const env = plugin.env;
    let targetFile: any;
    let block: any;
  
    if (targetPath.endsWith("#")) targetPath = targetPath.slice(0, -1);
  
    if (targetPath.includes("#")) {
      const linkPath = targetPath.split("#")[0];
      targetFile = plugin.app.metadataCache.getFirstLinkpathDest(linkPath, "");
      block = env.smart_blocks.get(targetPath);
    } else {
      targetFile = plugin.app.metadataCache.getFirstLinkpathDest(targetPath, "");
    }
  
    let leaf: any;
    if (event) {
      const mod = plugin.obsidian.Keymap.isModEvent(event);
      leaf = plugin.app.workspace.getLeaf(mod);
    } else {
      leaf = plugin.app.workspace.getMostRecentLeaf();
    }
  
    await leaf.openFile(targetFile);
  
    if (block?.line_start) {
      const editor = leaf.view.editor;
      const pos = { line: block.line_start, ch: 0 };
      editor.setCursor(pos);
      editor.scrollIntoView({ to: pos, from: pos }, true);
    }
  }