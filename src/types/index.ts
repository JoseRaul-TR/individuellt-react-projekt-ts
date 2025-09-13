export type Task = {
    id: string;
    title: string;
    description?: string;
    columnId: string;
    createdAt: string; // Date ISO
};

export type Column = {
    id: string;
    title: string;
    taskIds: string[]; // To set order
}

export type BoardState = {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[]; // Columns order in the board
}