import { Schema, model, type InferSchemaType } from 'mongoose';

const feedbackSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

feedbackSchema.index({
  userId: 1,
  createdAt: -1,
});

export type Feedback = InferSchemaType<typeof feedbackSchema>;

export const FeedbackModel = model('Feedback', feedbackSchema);
