import { useQuery } from '@tanstack/react-query';

import { templateApi } from '../api/template.api';

// -----------------------------------------
// GET ALL USER TEMPLATES
// -----------------------------------------

const useGetTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: templateApi.getAll,
  });
};

// -----------------------------------------
// GET PRIVATE TEMPLATES
// -----------------------------------------

const useGetPrivateTemplates = () => {
  return useQuery({
    queryKey: ['templates', 'private'],
    queryFn: templateApi.getPrivate,
  });
};

// -----------------------------------------
// GET PUBLIC TEMPLATES
// -----------------------------------------

const useGetPublicTemplates = () => {
  return useQuery({
    queryKey: ['templates', 'public'],
    queryFn: templateApi.getPublic,
  });
};

// -----------------------------------------
// GET TEMPLATE BY ID
// -----------------------------------------

const useGetTemplate = (templateId?: string) => {
  return useQuery({
    queryKey: ['templates', templateId],

    queryFn: () => templateApi.get(templateId!),

    enabled: !!templateId,
  });
};

export const useTemplateQuery = {
  useGetTemplates,
  useGetPrivateTemplates,
  useGetPublicTemplates,
  useGetTemplate,
};
