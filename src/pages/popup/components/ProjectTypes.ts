export type Project = {
  id: string;
  name: string;
  description: string;
  nextDeadline: string;
  lastUpdated: string;
  techStack: string[];
  userStories: string[];
};

export type ProjectFormValues = {
  id: string;
  name: string;
  description: string;
  nextDeadline: string;
  techStackInput: string;
  userStoriesInput: string;
};
