#!/bin/bash
set -e

echo "→ Atualizando código..."
git pull origin main

echo "→ Instalando dependências..."
npm install --omit=dev

echo "→ Fazendo build..."
npm run build

echo "→ Reiniciando aplicação..."
pm2 restart expansao-ai

echo "✓ Deploy concluído!"
