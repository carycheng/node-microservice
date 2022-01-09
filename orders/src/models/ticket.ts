import mongoose from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
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

// This works because a Mongo Model wraps a Mongo Schema
// The nomenclature is to always use statics property to add
// methods to a Schema

// With this you can use User.build only we only need to export
// User and not a separate build function.
// Typescript complains about not recognizing build on the
// User Model so we have the interface defined above to help out
// Typescript
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

// This associated the Model with the Schema
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }