import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import { useModalStore } from '../../store/modal.store';
import { useDesignerStore } from '../../store/designer.store';

import type { TemplateFormData, TemplateVisibility } from '../../types';
import { templateService } from '../../services/template.service';

const TemplateModal = () => {
  const close = useModalStore((state) => state.close);

  const designerId = useDesignerStore((state) => state.designerId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TemplateFormData>({
    defaultValues: {
      name: '',
      description: '',
      visibility: 'private',
    },
  });

  const visibility = watch('visibility');

  const onSubmit = (formData: TemplateFormData) => {
    if (!designerId) return;

    const template = {
      name: formData.name.trim(),
      description: formData.description?.trim() || undefined,
      visibility: formData.visibility,
    };

    templateService.create(template);

    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <DialogHeader>
        <DialogTitle>Save as Template</DialogTitle>

        <DialogDescription>Save the current timetable structure for reuse.</DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="template-name">Template Name</Label>

          <Input
            id="template-name"
            placeholder="e.g. CSE 3rd Year"
            {...register('name', {
              required: 'Template name is required',

              minLength: {
                value: 3,
                message: 'Name must contain at least 3 characters',
              },

              maxLength: {
                value: 100,
                message: 'Name cannot exceed 100 characters',
              },

              validate: (value) => value.trim().length > 0 || 'Template name is required',
            })}
          />

          {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="template-description">Description</Label>

          <Textarea
            id="template-description"
            placeholder="Describe this timetable template..."
            className="min-h-22.5 resize-none"
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description cannot exceed 500 characters',
              },
            })}
          />

          {errors.description && (
            <p className="text-[10px] text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Visibility */}
        <div className="space-y-3">
          <Label>Visibility</Label>

          <RadioGroup
            value={visibility}
            onValueChange={(value) => setValue('visibility', value as TemplateVisibility)}
          >
            {/* Private */}
            <label
              className="
                flex cursor-pointer items-start
                gap-3 rounded-lg border p-3
                transition-colors
                hover:bg-muted/50
              "
            >
              <RadioGroupItem value="private" />

              <div className="space-y-0.5">
                <p className="text-sm font-medium">Private</p>

                <p className="text-[11px] text-muted-foreground">
                  Only you can access this template.
                </p>
              </div>
            </label>

            {/* Public */}
            <label
              className="
                flex cursor-pointer items-start
                gap-3 rounded-lg border p-3
                transition-colors
                hover:bg-muted/50
              "
            >
              <RadioGroupItem value="public" />

              <div className="space-y-0.5">
                <p className="text-sm font-medium">Public</p>

                <p className="text-[11px] text-muted-foreground">
                  Anyone can discover and use this template.
                </p>
              </div>
            </label>
          </RadioGroup>
        </div>
      </div>

      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={close}>
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Save Template
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
};

export default TemplateModal;
