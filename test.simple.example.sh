curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -H "api-key: XXX" \
  -d '{
    "content": "Text message. Up to 2000 characters."
  }'
