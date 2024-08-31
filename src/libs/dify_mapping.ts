
export const idMapping: Record<string, string> = {
  '史上首个100_开源大模型重磅登场！破纪录公开代码_权重_数据集_训练全过程，AMD都能训.md': 'Omnivore/2024-01-06/史上首个100_开源大模型重磅登场！破纪录公开代码_权重_数据集_训练全过程，AMD都能训.md',
};

// export function getObsidianPath(title: string): string {
//     return idMapping[title] ?? title
// }


/**
 * 根据标题获取Obsidian文件路径
 * 如果标题对应的路径在idMapping中存在，则返回对应的ID；否则返回标题本身
 * 
 * @param title 文档标题，用作查找Obsidian文件路径的依据
 * @returns {string} 返回找到的Obsidian文件路径或原始标题
 */
export function getObsidianPath(title: string): string {
    // 在idMapping对象的每一项中，查找是否有值等于传入标题的项
    // 如果找到，返回该项的键；未找到则返回原始标题
    const path =  Object.entries(idMapping).find(([_, path]) => path === title)?.[0] ?? title
    return "Omnivore/2024-01-06/史上首个100_开源大模型重磅登场！破纪录公开代码_权重_数据集_训练全过程，AMD都能训.md"
}