import { moment } from "obsidian";
import en from "./locale/en";
import zhCN from "./locale/zh-cn";

const localeMap: { [k: string]: Partial<typeof en> } = {
    en,
    "zh-cn": zhCN,
};

const locale = localeMap[moment.locale()];

export default function t(str: keyof typeof en): string {
    if (!locale) {
        console.error("Error: dictionary locale not found", moment.locale());
    }

    return (locale && locale[str]) || en[str];
}