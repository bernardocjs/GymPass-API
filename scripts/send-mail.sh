#!/bin/bash

if [ -z "$EMAIL_RECIPIENT" ]; then
    echo "Error: EMAIL_RECIPIENT is not set"
    exit 1
fi

echo "Instalando o pacote mailutils"

sudo apt-get update
sudo apt-get install -y mailutils

echo "Pipeline Executado com Sucesso" | mail -s "Notificação de Pipeline" "$EMAIL_RECIPIENT"