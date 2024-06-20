import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false 
    },
    content: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        enum: ['text'],
        default: 'text'
    },
    recieverSeen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Message = model('Message', messageSchema);
