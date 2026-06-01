/** Comment API — see repo root 对外集成-公开API与AI说明.md */
export const commentConfig = {
  apiOrigin: import.meta.env.VITE_COMMENT_API_ORIGIN || 'https://comment-api-pi.vercel.app',
  projectSlug: import.meta.env.VITE_COMMENT_PROJECT_SLUG || 'gothic-remake',
  apiKey: import.meta.env.VITE_COMMENT_API_KEY || '',
  /** Admin section slug (SINGLE + NONE rating for homepage About block) */
  aboutSectionSlug: import.meta.env.VITE_COMMENT_ABOUT_SECTION_SLUG || 'home',
}

export function isCommentApiConfigured() {
  return Boolean(commentConfig.apiKey && commentConfig.projectSlug && commentConfig.aboutSectionSlug)
}
