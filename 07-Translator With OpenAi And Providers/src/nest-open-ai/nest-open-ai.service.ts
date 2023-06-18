import { Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { Languages } from 'src/translation/entities/translation.entity';
@Injectable()
export class NestOpenAiService {
  constructor(
    private openAiApi : OpenAIApi
  ) {}
  async translate(
    sourceLanguage: Languages,
    targetLanguages: Languages,
    phrase: string,
  ) {
    try{
      const chatCopmletion = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `You are a translator, I give you a phrase and you should get me the translation. don't provide anything except the translation

                      translate from ${sourceLanguage} to ${targetLanguages}
                      phrase: ${phrase}`,
          },
        ],
      });
      console.log(chatCopmletion.data.choices[0].message);
      return chatCopmletion.data.choices[0].message.content;
    } catch (err) {
      throw new Error(err);
    }
  }
}
