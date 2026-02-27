import fs from 'fs';
import path from 'path';

// Configuration interface
interface ZAIConfig {
  baseUrl: string;
  apiKey: string;
  chatId?: string;
  userId?: string;
}

// Config file path
const CONFIG_PATH = path.join(process.cwd(), '.z-ai-config');

/**
 * Get AI configuration from environment or config file
 * Priority: Environment Variables > Config File > Default
 */
export function getAIConfig(): ZAIConfig {
  // Check environment variables first
  const envBaseUrl = process.env.ZAI_BASE_URL;
  const envApiKey = process.env.ZAI_API_KEY;

  if (envBaseUrl && envApiKey) {
    return {
      baseUrl: envBaseUrl,
      apiKey: envApiKey,
      chatId: process.env.ZAI_CHAT_ID,
      userId: process.env.ZAI_USER_ID,
    };
  }

  // Try to read from config file
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const configStr = fs.readFileSync(CONFIG_PATH, 'utf-8');
      const config = JSON.parse(configStr);
      if (config.baseUrl && config.apiKey) {
        return config;
      }
    }
  } catch (error) {
    console.error('[AI Config] Error reading config file:', error);
  }

  // Default fallback for development
  return {
    baseUrl: 'http://172.25.136.193:8080/v1',
    apiKey: 'Z.ai',
  };
}

/**
 * Ensure config file exists for the SDK
 * This writes the config from environment variables if set
 */
export function ensureConfigFile(): void {
  const envBaseUrl = process.env.ZAI_BASE_URL;
  const envApiKey = process.env.ZAI_API_KEY;

  // If environment variables are set, write/update config file
  if (envBaseUrl && envApiKey) {
    const config: ZAIConfig = {
      baseUrl: envBaseUrl,
      apiKey: envApiKey,
      chatId: process.env.ZAI_CHAT_ID,
      userId: process.env.ZAI_USER_ID,
    };

    try {
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config));
      console.log('[AI Config] Config file created/updated from environment variables');
    } catch (error) {
      console.error('[AI Config] Error writing config file:', error);
    }
  }
}

/**
 * Initialize AI configuration
 * Call this at server startup
 */
export function initAIConfig(): ZAIConfig {
  ensureConfigFile();
  return getAIConfig();
}
