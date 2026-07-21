export type Publication = {
  authors: string;
  title: string;
  venue: string;
  year: string;
  url?: string;
};

/*
  Citations sourced from the papers themselves.
  Order: newest first.
*/
export const publications: Publication[] = [
  {
    authors:
      "Gavrilov, M. G., Jordan, K. A., Waraich, S. A., Zhou, W., Whittle, R. S., Joiner, W. M., Blustein, D., & Schofield, J. S.",
    title:
      "Measuring Intention: The Sense of Agency, Intentional Binding, and the Temporal Difference Limen",
    venue: "Manuscript",
    year: "2026",
  },
  {
    authors:
      "Siegel, J. R., Gavrilov, M. G., Roberts, A., Waraich, S. A., Whittle, R. S., & Schofield, J. S.",
    title:
      "Exploring the Perspectives of Different Professions on Task-Based Upper-Limb Prosthesis Assessment Techniques",
    venue: "Journal of Multidisciplinary Healthcare (in press)",
    year: "2026",
  },
  {
    authors:
      "Hong, K., Gavrilov, M. G., Trieu, P. H. D., Waraich, S. A., Marasco, P. D., Weir, R. F., Whittle, R. S., & Schofield, J. S.",
    title:
      "Quantifying Prosthetic Embodiment: Interactions Between Agency, Ownership, and Peripersonal Space in a Closed-Loop Sensorimotor Task",
    venue: "Research Square (preprint)",
    year: "2025",
    url: "https://doi.org/10.21203/rs.3.rs-7348715/v1",
  },
  {
    authors:
      "Gavrilov, M., Jordan, K. A., Zhou, W., Joiner, W. M., Blustein, D., & Schofield, J.",
    title:
      "Quantifying the Sense Agency: A Forced Choice Paradigm for Assessing Intentional Binding During Upper Limb Movements",
    venue:
      "2025 International Conference on Rehabilitation Robotics (ICORR), Chicago, IL",
    year: "2025",
    url: "https://doi.org/10.1109/ICORR66766.2025.11063055",
  },
  {
    authors:
      "Keogh, J. A. J., Ruder, M. C., White, K., Gavrilov, M. G., Phillips, S. M., Heisz, J. J., Jordan, M. J., & Kobsar, D.",
    title:
      "Longitudinal Monitoring of Biomechanical and Psychological State in Collegiate Female Basketball Athletes Using Principal Component Analysis",
    venue: "Translational Sports Medicine",
    year: "2024",
    url: "https://doi.org/10.1155/2024/7858835",
  },
];
