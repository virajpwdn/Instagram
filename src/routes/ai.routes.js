import { Router } from "express";
import generateContent from "../services/ai.service.js";

const aiRouter = Router();

aiRouter.get("/", async (req, res) => {
  const prompt = req.query.prompt
  const response = await generateContent(prompt);
  res.status(200).json({ response });
});

export const generateCaptionFromImageBuffer = async (imageBuffer) => {
    const result = await model.generateContent([
        {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        'Caption this image.',
    ]);
    return result.response.text();
}

export default aiRouter;
