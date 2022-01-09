import { Publisher, Subjects, TicketUpdatedEvent } from '@msticketsdev/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}