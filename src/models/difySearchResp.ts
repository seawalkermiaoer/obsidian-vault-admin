type Outputs = {
    "result": []
};

type Data = {
    id: string;
    workflow_id: string;
    status: string;
    outputs: Outputs;
    error: string | null;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    finished_at: number;
};

type WorkflowResult = {
    workflow_run_id: string;
    task_id: string;
    data: Data;
};

export function parseDifyResp(workflowResult: WorkflowResult): object {
    const { result } = workflowResult.data.outputs;
    return result;
}
