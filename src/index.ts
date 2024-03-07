import dotenv from 'dotenv'
import express, {Express, Request, Response} from 'express';
import { v1Router } from './router/v1';
import { errorHandling } from './middleware/errorHandling';
var cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(
    cors({
      origin: '*',
      // Allow follow-up middleware to override this CORS for options
      preflightContinue: true,
    }),
);

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('App is running');
})

app.use('/v1', v1Router())

app.use(errorHandling)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});