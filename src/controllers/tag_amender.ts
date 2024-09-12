import { TFile, Vault } from "obsidian";
import VaultAdminPlugin from "../../main";

import { format } from 'date-fns';
import { upload_to_dify, UploadRequest } from "src/libs/upload_to_dify";

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
        const lines = data.split('\n');
        let ret = lines.map(line => (line.startsWith("#") || !line.includes("#")) ? line : line.replace("#", " "));
        // console.log(ret)
        return ret.join('\n');
    })
}

async function upload_file(url: string, datasetId:string, apiSecret:string, vault: Vault, file: TFile) {

    // 示例调用
    vault.process(file, (data) => {
        console.log('upload to dify for: ', file.path)
        const lines = data.split('\n');
        const requestData: UploadRequest = {
            name: file.path,
            text: lines.join('\n'),
            indexing_technique: 'economy',
            process_rule: {
                mode: 'automatic',
            },
        };
        upload_to_dify(url, datasetId, apiSecret, requestData)
            .then((resp) => {
                console.log('Upload successful:', resp);
            })
            .catch((error) => {
                console.error('Error uploading:', error);
            });
        // console.log('upload done.')
        return data
    })



}


export async function sync_dify(plugin: VaultAdminPlugin) {
    const lastSyncAt = plugin.settings.lastSyncAt
    const lastSyncAtTs: number = convertStringToTs(lastSyncAt);
    const obsidianSyncFolder = plugin.settings.obsidianSyncFolder

    const files = this.app.vault.getMarkdownFiles()

    const url = plugin.settings.difyBaseUrl
    const datasetId = plugin.settings.difyDatasetId
    const apiSecret = plugin.settings.difyDatasetApiSecret
    //upload to dify
    for (let i = 0; i < files.length; i++) {
        const path = files[i].path
        const mtime = files[i].stat.ctime
        if (is_omnivore_file(path, obsidianSyncFolder) && is_need_amend(mtime, lastSyncAtTs)) {
            console.log(path);
            await upload_file(url, datasetId, apiSecret, this.app.vault, files[i])
        }
    }

    const now = new Date();
    const ts = format(now, "yyyy-MM-dd'T'HH:mm:ss");
    plugin.settings.lastSyncAt = ts
    await plugin.saveSettings();

}


export async function amend_tag(plugin: VaultAdminPlugin) {
    const lastAmendAt = plugin.settings.amendAt
    const lastAmendAtTs: number = convertStringToTs(lastAmendAt);
    const omnivoreFolder = plugin.settings.omnivoreFolder
    // console.log(lastAmendAt, lastAmendAtTs, omnivoreFolder)
    const files = this.app.vault.getMarkdownFiles()

    const now = new Date();
    const ts = format(now, "yyyy-MM-dd'T'HH:mm:ss");

    for (let i = 0; i < files.length; i++) {
        const path = files[i].path
        const mtime = files[i].stat.ctime
        if (is_omnivore_file(path, omnivoreFolder) && is_need_amend(mtime, lastAmendAtTs)) {
            console.log(path);
            tagfy(this.app.vault, files[i])
        }
    }
    plugin.settings.amendAt = ts
    await plugin.saveSettings();

}