const express = require('express');
const { verifyKeyMiddleware } = require('discord-interactions');
const app = express();
const port = 3000;

app.get('/api/discordbotorchestraion', (req, res) => {
  resolveRequest(req, res);
});

app.post(
  '/api/discordbotorchestraion',
  // verifyKeyMiddleware(
  //   'adebff3f9bcd77ffaa86b4069690f8dedf829775fcdf639755e8c330726f5aa6'
  // ),
  (req, res) => {
    console.log('received request');
    resolveRequest(req, res);
  }
);

const resolveRequest = (req, res) => {
  // if (req && req.body && req.body.type && req.body.type == 1) {
  //   res.status(200).json({
  //     status: 200,
  //     body: {
  //       type: 1,
  //     },
  //   });
  //   console.log('sent pong');
  //   return;
  // }
  res.status(200).json({
    type: 4,
    data: {
      tts: true,
      content: 'Congrats on sending your command!',
      embeds: [],
      allowed_mentions: { parse: [] },
    },
  });
  console.log('sent response');
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
