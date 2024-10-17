curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -H "api-key: 54321098765431239876543210987654321098" \
  -d '{
    "content": "Text message. Up to 2000 characters."
  }'
