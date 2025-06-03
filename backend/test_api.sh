#!/bin/bash
echo "🧪 Testing CineFluent API"
echo "========================"

BASE_URL="http://localhost:8000"

echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | python -m json.tool

echo -e "\n2. Testing movies endpoint..."
curl -s "$BASE_URL/api/v1/movies" | python -m json.tool

echo -e "\n3. Testing login endpoint..."
curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"demo@cinefluent.com","password":"demo123"}' | python -m json.tool

echo -e "\n4. Testing user info endpoint..."
curl -s "$BASE_URL/api/v1/user/me" | python -m json.tool

echo -e "\n✅ API tests completed!"
