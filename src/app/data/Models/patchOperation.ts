export interface PatchOperation {
    op: 'replace' | 'add' | 'remove';
    path: string;
    value?: any;
}