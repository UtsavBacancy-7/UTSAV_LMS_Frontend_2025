export interface PatchOperation {
    op: 'replace' | 'add' | 'remove' | 'copy' | 'move' | 'test';
    path: string;
    value?: any;
    from?: string;
}