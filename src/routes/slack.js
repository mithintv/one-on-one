import express from "express";

const router = express.Router();

// router middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// custom routes;
// router.get('/install', async (req, res) => {
//   res.redirect(`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&state=${process.env.SLACK_STATE}&scope=channels:history,channels:join,channels:manage,channels:read,chat:write,groups:history,groups:read,groups:write,im:history,im:read,im:write,mpim:history,mpim:read,mpim:write,reminders:write,reminders:read&user_scope=reminders:read,reminders:write`);
// });

// router.get('/oauth_redirect', async (req, res) => {
//   const { code, state } = req.query;
//   if (state === process.env.SLACK_STATE) {
//     const { slack, user_token, response } = await install(code);
//     if (response) {
//       res.send('installation successful');
//       await initialization(slack, user_token);
//     }
//   }
// });

// router.post('/events', async (req, res) => {
//   res.sendStatus(200);
//   if (req.body.event.type === 'app_uninstalled') {
//     await uninstall(req);
//   } else {
//     console.log('recieved event');
//     console.log(req.body);
//   }
// });


export default router;
