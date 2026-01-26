import { tickets } from "../../../data/tickets";
import { 
    Ticket,
    CreateTicket,
    UpdateTicket,
    TicketPriority,
    TicketStatus
 } from "../types/ticket";
import { CaluclateUrgencyReturn, UrgencyResult } from "../types/urgency";

// Priority scores mapping
const PRIORITY_SCORES = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10
} as const;

/*
    CRUD Functions for Ticket entity
*/

/**
 * Retrieves all tickets.
 * @return An array of all tickets.
 */
export const getAllTickets = (): Ticket[] => tickets;

/**
 * 
 * @param ticket_id The id of the specfic ticket id - number
 * @returns ticket id
 */
export function getTicketById(ticket_id: number): Ticket | undefined {
    return tickets.find(ticket => ticket.id === ticket_id);
};

/**
 * Creates a new ticket.
 * 
 * @param createTicket The ticket to create
 * @returns The created ticket or an error message
 */
export function createTicket(createTicket: CreateTicket): Ticket | { error: string } {
    if(!createTicket.title) return { error: "Missing required field: title" };
    if(!createTicket.description) return { error: "Missing required field: description" };
    if(!["critical", "high", "medium", "low"].includes(createTicket.priority)) {
        return { error: "Invalid priority. Must be one of: critical, high, medium, low" };
    }

    const newTicket: Ticket = {
        id: tickets.length + 1,
        title: createTicket.title,
        description: createTicket.description,
        priority: createTicket.priority,
        status: "open",
        createdAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    return newTicket;
};

/**
 * Updates a ticket.
 * 
 * @param ticket_id the specific ticket id
 * @param updateTicket the ticket to update
 * @returns The updated ticket or an error message
 */
export function updateTicket(ticket_id: number, updateTicket: UpdateTicket): Ticket | { error: string } | { notFound: true } {
    const ticket = tickets.find(ticket => ticket.id === ticket_id);
    if(!ticket) return { notFound: true};

    if(updateTicket.priority && !["critical", "high", "medium", "low"].includes(updateTicket.priority)) {
        return { error: "Invalid priority. Must be one of: critical, high, medium, low" };
    }

    if(updateTicket.status && !["open", "in-progress", "resolved"].includes(updateTicket.status)) {
        return { error: "Invalid status. Must be one of: open, in-progress, resolved" };
    }

    Object.assign(ticket, updateTicket);
    return ticket;
};

/**
 * Deletes a ticket.
 * 
 * @param ticket_id the ticket to delete
 * @returns if the operation was successfull
 */
export function deleteTicket(ticket_id: number): boolean {
    const index = tickets.findIndex(ticket => ticket.id === ticket_id);
    if(index === -1) return false;

    tickets.splice(index, 1);
    return true;
};

/**
 * Calculates the urgency score of a ticket based on its priority and age.
 * 
 * @param ticket_id The ticket for which to calculate the urgency score.
 * @return The calculated urgency score.
 */
export function calculateTicketUrgency(ticket_id: number): CaluclateUrgencyReturn {
    const ticket = tickets.find(ticket => ticket.id === ticket_id);
    if(!ticket) return { notFound: true };

    if (ticket.status === "resolved") {
        const result: UrgencyResult = {
            ... ticket,
            ageInDays: 0,
            urgencyScore: 0,
            urgencyLevel: "Minimal. Ticket resolved."
        };
        return result;
    }

    const baseScore = PRIORITY_SCORES[ticket.priority];
    const createdAt = new Date(ticket.createdAt);
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    const AGE_MULTIPLIER = 5;
    const urgencyScore = baseScore + (ageInDays * AGE_MULTIPLIER);
    
    let urgencyLevel: string;

    if(urgencyScore >= 80){
        urgencyLevel = "Critical. Immediate attention required.";
    }else if(urgencyScore >= 55){
        urgencyLevel = "High urgency. Prioritize resolution.";
    }else if(urgencyScore >= 30){
        urgencyLevel = "Moderate. Schedule for attention.";
    }else{
        urgencyLevel = "Low urgency. Address when capacity allows.";
    }

    const result: UrgencyResult = {
        ... ticket,
        ageInDays,
        urgencyScore,
        urgencyLevel
    };

    return result;
};