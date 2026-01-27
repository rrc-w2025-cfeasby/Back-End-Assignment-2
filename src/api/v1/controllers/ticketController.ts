import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
import { CreateTicket, UpdateTicket } from "../types/ticket";

/**
 * Get all tickets
 * 
 * @param req Request object
 * @param res Response object
 */
export function getAllTickets(req: Request, res: Response) {
    const data = ticketService.getAllTickets();
    
    res.status(HTTP_STATUS.OK).json({ 
        message: "Tickets retrieved",
        count: data.length,
        data 
    });
};

/**
 * Get tickets by speciifc id found in the params object
 * 
 * @param req Request object
 * @param res Response object
 */
export function getTicketById(req: Request, res: Response) {
    const ticket_id = Number(req.params.id);
    const ticket = ticketService.getTicketById(ticket_id);

    if(!ticket){
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket retrieved",
        data: ticket
    });
};

/**
 * Create ticket by request body
 * 
 * @param req Request object
 * @param res Response object
 */
export function createTicket(req: Request, res: Response) {
    const result = ticketService.createTicket(req.body);

    if("error" in result){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
    }

    res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created",
        data: result
    });    
};

/**
 * Update ticket by params request id and body
 * 
 * @param req Request object
 * @param res Response object
 */
export function updateTicket(req: Request, res: Response) {
    const ticket_id = Number(req.params.id);
    const result = ticketService.updateTicket(ticket_id, req.body);

    if("error" in result){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
    }

    if("notFound" in result){
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: result.notFound });
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket updated",
        data: result
    });
};

/**
 * Delete ticket by params request id
 * 
 * @param req Request object
 * @param res Response object
 */
export function deleteTicket(req: Request, res: Response) {
    const ticket_id = Number(req.params.id);
    const deleted = ticketService.deleteTicket(ticket_id);

    if(!deleted){
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    }

    res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" });
};

/**
 * Get Ticket urgency by params request id
 * 
 * @param req Request object
 * @param res Response object
 */
export function getTicketUrgency(req: Request, res: Response) {
    const ticket_id = Number(req.params.id);
    const result = ticketService.calculateTicketUrgency(ticket_id);

    if("notFound" in result){
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket urgency calculated",
        data: result
    });
};