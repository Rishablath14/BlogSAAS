"use server";
import OpenAI from "openai";

export const getAiresponse = async (title: string, description: string, content: string) => {    
    const openai = new OpenAI({apiKey: process.env['OPENAI_API_KEY'],});
    const prompt = `
    You are an SEO expert. Analyze the following blog post for SEO purposes and provide the following:
    1. An SEO score between 1-100.
    2. Keyword suggestions.
    3. Suggestions for improving the title, description, and content.
    4. Check for proper HTML tags, word count, keyword usage, and the overall quality of the content.
    Blog Title: ${title}
    Description: ${description}
    Content: ${content}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are an SEO assistant." },
        {
            role: "user",
            content: prompt,
        },
    ],
});
console.log(completion.choices[0].message.content);
return true;
}