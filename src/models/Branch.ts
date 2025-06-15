import mongoose from 'mongoose';

export interface IBranch {
    name: string;
    location: string;
    motto: string;
    socialLinks?: {name:string; url:string}[];
    banner: string;
    createdAt: Date;
    updatedAt: Date;
}

const BranchSchema = new mongoose.Schema<IBranch>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    motto: { type: String, required: false },
    socialLinks: [{ name: { type: String, required: false }, url: { type: String, required: false } }],
    banner: { type: String },
}, {
    timestamps: true,
})

export default mongoose.models.Branch || mongoose.model<IBranch>('Branch',BranchSchema)