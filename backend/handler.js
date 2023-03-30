const { Configuration, OpenAIApi } = require("openai");

module.exports.summarize = async (event) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  body = JSON.parse(event.body);
  const prompt = body.prompt;
  const model = body.model;

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].text)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, event: event, detail: {prompt: prompt, model: model} })
    };
  }
};
