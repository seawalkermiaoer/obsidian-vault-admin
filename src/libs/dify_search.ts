
import axios from 'axios';
import { parseDifyResp } from 'src/models/difySearchResp';


export async function difySearch(query: string, apiKey: string, userId: string) {
    console.log(query, apiKey, userId)
    try {
        const response = await axios.post(
            'http://localhost/v1/workflows/run',
            {
                inputs: {
                    "query": `${query}`,
                },
                response_mode: 'blocking',
                user: userId
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        // console.log(response.data)
        const results = parseDifyResp(response.data);
        // console.log(Array.isArray(results));

        // Parse results and extract title, content, and document_id
        const parsedResults = (results as any[]).map((result: { title: string; content: string; metadata: { document_id: string } }) => ({
            title: result.title,
            content: result.content,
            document_id: result.metadata.document_id
        }));
        const g = groupAndCountByTitle(parsedResults);
        // console.log(g);
        const ret = g.map((item) => ({
            uri: item.title,
            count: item.count,
            content: item.content,
            title: item.title
        })).filter((item) => item.title.indexOf(query) === -1 );
        return ret;

    } catch (error) {
        console.error('Error running workflow:', error);
        throw error;
    }
}

function groupAndCountByTitle(input: Array<{ title: string; content: string; document_id: string }>) {
    const groupedByTitle = input.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = {
                count: 0,
                content: item.content
            }
        }
        acc[item.title].count++
        return acc
    }, {} as Record<string, { count: number; content: string }>)

    return Object.entries(groupedByTitle).map(([title, { count, content }]) => ({
        title,
        count,
        content,
        
    }))
}

