import { TFile, Vault } from "obsidian";
import VaultAdminPlugin from "../main";

function is_omnivore_file(path: string, omnivoreFolder: string) {
    return path.startsWith(omnivoreFolder)
}

function is_need_amend(mtime: number, lastAmendAtTs: number) {
    return mtime >= lastAmendAtTs
}

function convertStringToTs(dateStr: string): number {
    return new Date(dateStr).getTime();
}


// tagfy 
function tagfy(vault: Vault, file: TFile): Promise<string> {
    return vault.process(file, (data) => {
        console.log('amending tag for ', file.path)
        return data;
    })
}

export async function amend_tag(plugin: VaultAdminPlugin) {
    const lastAmendAt = plugin.settings.amendAt
    const lastAmendAtTs: number = convertStringToTs(lastAmendAt);

    const omnivoreFolder = plugin.settings.omnivoreFolder

    console.log(lastAmendAt, lastAmendAtTs, omnivoreFolder)

    const files = this.app.vault.getMarkdownFiles()
    for (let i = 0; i < files.length; i++) {
        const path = files[i].path
        const mtime = files[i].stat.ctime
        if (is_omnivore_file(path, omnivoreFolder) && is_need_amend(mtime, lastAmendAtTs)) {
            console.log(path);
            tagfy(this.app.vault, files[i])
        }
    }
}