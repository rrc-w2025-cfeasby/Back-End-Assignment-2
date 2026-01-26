export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketStatus = "open" | "in-progress" | "resolved";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    createdAt: string;
}

export interface CreateTicket {
    title: string;
    description: string;
    priority: TicketPriority;
}

export interface UpdateTicket {
    title?: string;
    description?: string;
    priority?: TicketPriority;
    status?: TicketStatus;
}