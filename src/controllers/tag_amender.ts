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
        console.log(ret)
        return ret.join('\n');
    })
}

async function upload_file(vault: Vault, file: TFile) {

    // 示例调用
    const datasetId = '50004fe8-3261-4e05-af38-dbfc79accfd6';
    const apiKey = 'dataset-HiLIiOQZyvXrtFEKm4rxEkn3';


    vault.process(file, (data) => {
        console.log('upload to dify for: ', file.path)
        console.log(data)
        const lines = data.split('\n');
        const requestData: UploadRequest = {
            name: file.path,
            text: lines.join('\n'),
            indexing_technique: 'economy',
            process_rule: {
                mode: 'automatic',
            },
        };
        console.log(requestData)

        upload_to_dify(datasetId, apiKey, requestData)
            .then((resp) => {
                console.log('Upload successful:', resp);
            })
            .catch((error) => {
                console.error('Error uploading:', error);
            });
        console.log('upload done.')
        return ""
    })



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

    // upload to dify
    for (let i = 0; i < files.length; i++) {
        await upload_file(this.app.vault, files[i])
        break
    }


}