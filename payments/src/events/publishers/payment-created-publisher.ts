import { Subjects, Publisher, PaymentCreatedEvent } from '@msticketsdev/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}