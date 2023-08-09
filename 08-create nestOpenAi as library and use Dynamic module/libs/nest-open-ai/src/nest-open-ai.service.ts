import { Injectable} from '@nestjs/common';
import { OpenAIApi } from 'openai';
@Injectable()
export class NestOpenAiService {
  constructor(private openAiApi: OpenAIApi) {}
  async translate(
    sourceLanguage: string,
    targetLanguages: string,
    phrase: string,
  ) {
    try {
      const chatCopmletion = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a translator, I give you a phrase and you should get me the translation. don't provide anything except the translation`,
          },
          {
            role: 'user',
            content: `translate from ${sourceLanguage} to ${targetLanguages}\nphrase: ${phrase}`,
          },
        ],
      });
      const { choices } = chatCopmletion.data;
      const {
        message: { content },
      } = choices[choices.length - 1];
      const processedContent = content
        /** remove " and ' from the beginning and end */
        .replace(/^['"]|['"]$/g, '')
        /** replace phrase: from the begging */
        .replace(/^[pP]hrase:/, '')
        /** replace translation: from the begging */
        .replace(/^[tT]ranslation:/, '')
        /** remove the last . */
        .replace(/\.$/, '')
        .trim();
      return processedContent;
    } catch (error) {
      if (typeof error === 'object') {
        if ('response' in error) {
          return {
            error: error.response.data,
          };
        }
      }
    }
  }
}
