import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;

  constructor() {
        this.bot = new TelegramBot(
        process.env.TELEGRAM_BOT_TOKEN!,
        {
            polling: false,
        },
        );
    }
    async sendNewJob(job: Job) {
    const message = `
    🚀 <b>New Job Found!</b>

    🏢 <b>Company:</b> ${job.companyName}

    💼 <b>Role:</b> ${job.title}

    📍 <b>Location:</b> ${job.location}

    🌍 <b>Remote:</b> ${job.remoteStatus ? "❌" : "✅"}

     <b>Source:</b> ${job.source}

     <b>Application Link:</b> ${job.applicationUrl}

     <b>Posted At:</b> ${job?.postedAt?.toDateString()}

    🔗 <a href="${job.applicationUrl}">Apply Now</a>
    `;

    await this.bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID!,
        message,
        {
        parse_mode: "HTML"
        },
    );
    }
}