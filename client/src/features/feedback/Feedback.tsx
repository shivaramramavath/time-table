import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import { useFeedbackQuery } from './hooks/feedback.query';

interface FeedbackFormValues {
  message: string;
  rating: number;
}

const Feedback = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      message: '',
      rating: 5,
    },
  });

  const {
    mutate: createFeedback,
    isPending,
    isSuccess,
    isError,
  } = useFeedbackQuery.useCreateFeedback();

  const onSubmit = (data: FeedbackFormValues) => {
    createFeedback(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Share your feedback</h1>

          <p className="text-sm text-muted-foreground">
            Tell us what you think about the application.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Feedback */}
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Feedback
            </label>

            <Textarea
              id="feedback"
              placeholder="Write your feedback..."
              className="min-h-[140px] resize-none"
              {...register('message', {
                required: 'Feedback is required',
                minLength: {
                  value: 5,
                  message: 'Feedback must be at least 5 characters',
                },
              })}
            />

            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Rating</Label>

            <RadioGroup
              defaultValue="5"
              onValueChange={(value) =>
                setValue('rating', Number(value), {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className="flex gap-6"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={String(value)} id={`rating-${value}`} />

                  <Label htmlFor={`rating-${value}`}>{value}</Label>
                </div>
              ))}
            </RadioGroup>

            {errors.rating && <p className="text-sm text-destructive">{errors.rating.message}</p>}
          </div>

          {/* Status */}
          {isSuccess && (
            <p className="text-sm text-green-600">Thank you! Your feedback has been submitted.</p>
          )}

          {isError && (
            <p className="text-sm text-destructive">Failed to submit feedback. Please try again.</p>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
