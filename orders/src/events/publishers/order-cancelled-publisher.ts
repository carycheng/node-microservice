import { Subjects, Publisher, OrderCancelledEvent } from '@msticketsdev/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}