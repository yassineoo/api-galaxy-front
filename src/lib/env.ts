import { z } from "zod"
import { config } from "dotenv"
config();

const server_env_schema = z.object({
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    CLOUDINARY_API_SECRET: z.string(),
    CLOUDINARY_PRESET_NAME: z.string(),
})

type SERVER_ENV_TYPE = z.infer<typeof server_env_schema>

export function validateServerEnv() {
    try {
        const env = server_env_schema.parse(process.env)
        return env
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            console.log(e.issues)
        }
    }
}

export const SERVER_ENV = validateServerEnv() as SERVER_ENV_TYPE

