export type TemplateVisibility = 'private' | 'public';

export interface TemplateFormData {
  name: string;
  description?: string;
  visibility: TemplateVisibility;
}

export interface Template {
  name: string;
  description?: string;

  visibility: TemplateVisibility;
}
