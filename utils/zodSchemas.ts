import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(150),
  subdirectory: z.string().min(1).max(40),
});

export const PostSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(190),
  category: z.string().min(1).max(100),
  coverImage: z.string().min(1),
  smallDescription: z.string().min(1).max(200),
  articleContent: z.string().min(1),
  content: z.string().optional(),
});

export function SiteCreationSchema(options?: {
  isSubdirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1, "Subdirectory cannot be empty.")  // Minimum length validation
      .max(40, "Subdirectory cannot be longer than 40 characters.") // Maximum length validation
      .regex(/^[a-z]+(-[a-z]+)*$/, "Subdirectory must only use lowercase letters and can be separated by single '-' without consecutive dashes.")
      .transform((value) => value.trim()) // Remove leading and trailing spaces
      .transform((value) => value.replace(/\s+/g, '-')) // Replace spaces with dashes
      .transform((value) => value.toLocaleLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof options?.isSubdirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          return options.isSubdirectoryUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Subdirectory is already taken...",
              });
            }
          });
        })
      ),
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(150),
  });
}
