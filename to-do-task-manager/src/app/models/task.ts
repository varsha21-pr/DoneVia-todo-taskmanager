export interface Task {
taskId: number;
title: string;
description: string;
dueDate: string;
createdAt: string;
status: 'PENDING' | 'COMPLETED';

}
