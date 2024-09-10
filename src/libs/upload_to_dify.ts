const fetch = require('node-fetch');

interface ProcessRule {
  mode: string;
}

export interface UploadRequest {
  name: string;
  text: string;
  indexing_technique: string;
  process_rule: ProcessRule;
}

export async function upload_to_dify(datasetId: string, apiKey: string, requestData: UploadRequest) {
  const url = `http://localhost/v1/datasets/${datasetId}/document/create_by_text`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}


