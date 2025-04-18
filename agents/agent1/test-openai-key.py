import openai

client = openai.OpenAI()

models = client.models.list()

for model in models.data:
    print(model.id)
    
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the difference between alpha and beta in investing?"}
    ],
    temperature=0.7,
    max_tokens=200,
)

print(response.choices[0].message.content)