import { Publisher, Subjects, TicketCreatedEvent } from '@msticketsdev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}