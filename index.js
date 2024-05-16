//import OpenAI from 'openai';
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('fortuneTell',function(req, res){
  res.send('POST request to the homepage');
});

const cors = require('cors')
app.use(cors())

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: 'sk-proj-5ak65Vl5KJwhUpA51Gs5T3BlbkFJwiSqhDXc75ZHeR50vPvp', // This is the default and can be omitted
});

app.post('/fortunetell', async function(req, res) {
  const completion = await openai.chat.completions.create({
    messages:  [
      {
        "role": "system",
        "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 당신의 이름은 챗도지입니다."
      },
      {
        "role": "user",
        "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 당신의 이름은 챗도지입니다."
      },
      {
        "role": "assistant",
        "content": "안녕하세요!저는 챗도지입니다. 여러분에게 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다."
      },
      {
        "role": "user",
        "content": "오늘의 운세가 뭐야?"
      }
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    temperature: 0.5,
  });

  let fortune = completion.choices[0].message['content'];
  console.log(fortune);
  res.send(fortune);
});

app.listen(3000)



