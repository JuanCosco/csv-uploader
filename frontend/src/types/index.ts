export interface SuccessRecord {
    id: number;
    name: string;
    email: string;
    age: number | null;
}

export interface ErrorRecord {
    row: number;
    details: Record<string, string>
}

export interface UploadResult {
    success: SuccessRecord[];
    errors: ErrorRecord[];
}