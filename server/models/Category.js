import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        maxlength: [50, 'Category name must be less than 50 characters']
    },
    icon: {
        type: String,
        required: [true, 'Category icon is required'],
        default: '📌'
    },
    color: {
        type: String,
        required: [true, 'Category color is required'],
        default: '#6B7280'
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Category type is required']
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Compound index for unique category names per user and type
categorySchema.index({ user: 1, name: 1, type: 1 }, { unique: true });

// Index for querying by type
categorySchema.index({ user: 1, type: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
