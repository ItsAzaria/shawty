import mongoose, { Document } from "mongoose";
import shortID from "shortid";

export interface IUrlSchema extends Document {
  full: string;
  short?: string;
  clicks?: number;
}

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortID.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model<IUrlSchema>("ShortUrl", urlSchema);
