import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from '../models/order';

interface TicketAttrs {
    id: string;
    title: string;
    price: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema<TicketDoc>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.set('versionKey', 'version');
// @ts-ignore
ticketSchema.plugin(updateIfCurrentPlugin);

// This works because a Mongo Model wraps a Mongo Schema
// The nomenclature is to always use statics property to add
// methods to a Schema

// With this you can use User.build only we only need to export
// User and not a separate build function.
// Typescript complains about not recognizing build on the
// User Model so we have the interface defined above to help out
// Typescript
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    });
}

// While ticketSchema.statics adds a method to model
// ticketSchema.methods adds a method to the document

// Make sure that this ticket is not already reserved
// Run query to look at all orders. Find an order what ticket
// is the ticket we just found *ans* the orders status is not canceled
// If we find an order from that means the ticket *is* reserved
ticketSchema.methods.isReserved = async function() {
    // this === the ticket document that we just called 'isReserved on
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
}

// This associated the Model with the Schema
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }