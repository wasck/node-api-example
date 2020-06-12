import * as shell from 'shelljs';
import fs from 'fs';
import Logger from '../config/winston.config';
import LogLevel from '../enums/log-level.enum';

const envPath = './.env';

shell.cp( "-R", "src/views", "dist/" );

try {
    if (!fs.existsSync(envPath)) {
        shell.cp( "-R", ".env.example", ".env" );
        shell.cp( "-R", ".env.example", "dist/.env" );
    }
} catch (error) {
    Logger.error(error);
}