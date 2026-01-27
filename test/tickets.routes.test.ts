import request from "supertest";
import app from "../src/app";
import { tickets } from "../src/data/tickets";
import { title } from "node:process";
import { Ticket } from "../src/api/v1/types/ticket";

describe("Ticket Routes", () => {
    // Test GET /tickets
    test("GET /tickets - should return all tickets", async () => {
        const response = await request(app).get("/api/v1/tickets");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(tickets.length);
    })

    // GET /tickets returns correct structure
    test("GET /tickets - should return correct strucuture", async () => {
        const response = await request(app).get("/api/v1/tickets");

        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
    })

    // GET /tickets/:id
    test("GET /tickets/:id - should return a ticket by ID", async () => {
        const response = await request(app).get("/api/v1/tickets/1");

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
    });

    // GET /tickets/:id returns 404 for non-existing ID
    test("GET /tickets/:id - should return 404 for non-existing ID", async () => {
        const response = await request(app).get("/api/v1/tickets/999");

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Ticket not found");
    });

    // Test POST /tickets
    test("POST /tickets - should create a new ticket", async () => {
        const newTicket = {
            title: "New Ticket",
            description: "This is a new ticket",
            status: "open",
            priority: "high"
        };

        const response = await request(app)
            .post("/api/v1/tickets")
            .send(newTicket);

        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe("New Ticket");
    });

    // Test POST /tickets with missing fields
    test("POST /tickets - should return 400 for missing fields", async () => {
        const response = await request(app)
            .post("/api/v1/tickets")
            .send({ title: "Incomplete Ticket" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Missing required field: description");
    });

    // Test PUT /tickets/:id
    test("PUT /tickets/:id - should update an existing ticket", async () => {
        const response = await request(app)
            .put("/api/v1/tickets/1")
            .send({ status: "in-progress" });

        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe("in-progress");
    });

    // Test PUT /tickets/:id with non-existing ID return 404
    test("PUT /tickets/:id - should return 404 for non-existing ID", async () => {
        const response = await request(app)
            .put("/api/v1/tickets/999")
            .send({ status: "in-progress" });
        
        expect(response.status).toBe(404);
    });
    
    // Test DELETE /tickets/:id
    test("DELETE /tickets/:id - should delete a ticket", async () => {
        const response = await request(app).delete("/api/v1/tickets/2");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Ticket deleted");
    });

    // Test DELETE /tickets/:id with non-existing ID return 404
    test("DELETE /tickets/:id - should return 404 for non-existing ID", async () => {
        const response = await request(app).delete("/api/v1/tickets/999");

        expect(response.status).toBe(404);
    });
});